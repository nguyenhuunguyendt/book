const db = require("../db/db");
const { deleteFile } = require("../utils");
const utils = require("../utils");
const { sendEmail } = require("../utils");
class AdminService {
  async active(id) {
    const userUpdated = await db("users")
      .where({ id, isActive: false })
      .update({ isActive: true });
    return {
      code: 200,
      message: "Success",
      userUpdated,
    };
  }

  async resetPassword({ id, passwordNew }) {
    const hashpassword = await utils.hashUserPassword(passwordNew);
    const userUpdated = await db("users")
      .where({ id })
      .update({ password: hashpassword });
    return {
      code: 200,
      message: "Success",
      userUpdated,
    };
  }

  async createBook(bookInput) {
    console.log(222);
    const { name, author, quantity, type, year, image } = bookInput;
    const [nInserted] = await db("books").insert({
      name,
      author,
      quantity,
      type,
      year,
      image,
    });
    return {
      code: 200,
      message: "success",
      nInserted,
    };
  }

  async deleteBook(id) {
    let data;
    const book = await db("books").where({ id }).first();
    if (book) {
      // kiểm tra xem có user nào đang mượn sách hay không mới xóa
      const bookBorrow = await db("books")
        .innerJoin("stores", "books.id", "stores.bookId")
        .where("books.id", id)
        .andWhere("stores.status", "S2");
      if (bookBorrow.length > 0) {
        data = {
          code: 300,
          message: "Hiện đang có người mượn sách !",
        };
      } else {
        // deleteFile(book.image);
        const bookDeleted = await db("books").where({ id }).del();
        data = {
          code: 200,
          message: "Success",
          bookDeleted,
        };
      }
    } else {
      data = {
        code: 300,
        message: "không tìm thấy sách",
      };
    }
    return data;
  }

  async updateBook(id, bookInput) {
    const { name, author, year, quantity, type, image } = bookInput;
    const bookUpdated = await db("books").where({ id }).update({
      name,
      author,
      year,
      quantity,
      type,
      image,
    });
    return {
      code: 200,
      message: "success",
      bookUpdated,
    };
  }

  async getAllUser(email) {
    if (!email) {
      email = "";
    }
    const users = await db("users")
      .whereILike("email", `%${email}%`)
      .select("id", "email", "isActive", "isAdmin");
    return {
      code: 200,
      message: "Success!",
      users,
    };
  }
  async approveBook(id) {
    let data = {};
    const row = await db("stores")
      .where({ id })
      .andWhere({ status: "S1" })
      .first();
    // lấy ra bản ghi chờ xác nhận nếu có bản ghi trong stores mới xác nhận
    if (row) {
      //  trừ đi số lượng của sách đang có
      const quantity = await db("books")
        .where({ id: row.bookId })
        .andWhere("quantity", ">", 0)
        .decrement("quantity", 1);
      if (quantity > 0) {
        // cập nhật trạng thái đã cho mượn
        // ngay mượn lấy ngày hiện tại , ngày trả + 7 ngày
        const currentDate = Math.floor(Date.now() / 1000);
        const bookUpdated = await db("stores")
          .where({ id })
          .andWhere({ status: "S1" })
          .update({
            status: "S2",
            dateBorrow: currentDate,
            dateGive: currentDate + 7 * 24 * 60 * 60,
          });
        const user = await db("users").where({ id: row.userId }).first();
        // gửi emai đến user đã mượn sách
        if (user) {
          await sendEmail(user);
        }
        data = {
          code: 200,
          message: "Success",
          bookUpdated,
        };
      } else {
        data = {
          code: 300,
          message: "quantity book = 0, not borrow",
        };
      }
    } else {
      data = {
        code: 300,
        message: "not calendar in stores",
      };
    }
    return data;
  }
  // lay theo id
  async getStorebyIdUser(userId, query) {
    const id = query.id || "";
    const name = query.name || "";
    const status = query.status || "";
    const data = await db
      .select(
        "stores.id",
        "books.quantity",
        "books.name",
        "stores.status",
        "stores.bookId",
        "users.email",
        "books.year",
        "stores.status",
        "stores.dateBorrow",
        "stores.dateGive"
      )
      .from("stores")
      .innerJoin("books", "stores.bookId", "books.id")
      .innerJoin("users", "stores.userId", "users.id")
      .where("stores.userId", userId)
      .whereILike("stores.id", `%${id}%`)
      .andWhereILike("books.name", `%${name}%`)
      .andWhereILike("stores.status", `%${status}%`);
    return {
      code: 200,
      message: "success",
      data,
    };
  }
  // nhan sach
  async approveGiveBook(id) {
    let data = {};
    // tìm ra lịch mượn sách ở trạng thái đang  mượn
    const row = await db("stores")
      .where({
        id,
        status: "S2",
      })
      .first();
    // nếu có update lại store và nhận lại số lượng sách +1
    if (row) {
      const currentDate = Math.floor(Date.now() / 1000);
      // thời gian trễ hẹn  =  thời gian đến trả - ngày hẹn trả
      const secondsDelay = currentDate - row.dateGive;
      const rowUpdated = await db("stores")
        .where({ id })
        .update({ status: "S3", dateGive: currentDate });
      // nhận thêm số lượng sách hiện có thêm 1
      const bookUpdated = await db("books")
        .where({ id: row.bookId })
        .increment("quantity", 1);
      data = {
        code: 200,
        message: "sucess",
        rowUpdated,
        secondsDelay: secondsDelay <= 0 ? 0 : secondsDelay,
        bookUpdated,
      };
    } else {
      data = {
        code: 300,
        message: "not calendar in stores",
      };
    }
    return data;
  }
  // lay tat ca
  async getHistory(query) {
    console.log(query);
    let id = query.id || "";
    let status = query.status || "";
    let nameBook = query.nameBook || "";
    let email = query.email || "";
    const data = await db
      .select(
        "stores.id",
        "books.quantity",
        "books.name",
        "stores.status",
        "stores.bookId",
        "users.email",
        "books.year",
        "stores.status",
        "stores.dateBorrow",
        "stores.dateGive"
      )
      .from("stores")
      .innerJoin("books", "stores.bookId", "books.id")
      .innerJoin("users", "stores.userId", "users.id")
      .whereILike("stores.id", `%${id}%`)
      .andWhereILike("stores.status", `%${status}%`)
      .andWhereILike("books.name", `%${nameBook}%`)
      .andWhereILike("users.email", `%${email}%`);

    return {
      code: 200,
      message: "success",
      data,
    };
  }
  // huy sach
  async canCelBook(id) {
    let data;
    const deleted = await db("stores").where({ id, status: "S1" }).del();
    if (deleted === 1) {
      data = {
        code: 200,
        message: "sucess",
      };
    } else {
      data = {
        code: 300,
        message: "lịch đặt không tồn tại hoặc đang ở trạng thái khác",
      };
    }
    return data;
  }
  // import file csv
  async ImportFileCsv(books) {
    try {
      const inserted = await db("books").insert(books);
      return {
        code: 200,
        message: "Success",
        inserted,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new AdminService();
