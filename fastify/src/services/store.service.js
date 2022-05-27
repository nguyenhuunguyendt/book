const db = require("../db/db");
const { sendEmail } = require("../utils");
class StoreService {
  async createStore({ userId, bookId }) {
    console.log("aaa");
    let data;
    const book = await db("books").where({ id: bookId }).first();
    // kiểm tra sách truyền vào có ở trong thư viện ?
    if (book) {
      /*kiểm tra số lượng sách còn mới thêm sách vào store (trạng thái S1 chờ xác nhận) */
      if (book.quantity > 0) {
        /* mỗi user chỉ được mượn 1 quyển sách đó , 
                nếu sách đó đang mượn hoặc chờ xác nhận thì không cho mượn */
        const book = await db("stores")
          .where("bookId", bookId)
          .andWhere("userId", userId)
          .andWhere(function () {
            this.where("status", "S1").orWhere("status", "S2");
          })
          .first();
        if (book) {
          data = {
            code: 300,
            message: "Sách đang chờ xác nhận hoặc đang được mượn !",
          };
        } else {
          const [inserted] = await db("stores").insert({
            userId,
            bookId,
            dateBorrow: Math.floor(Date.now() / 1000),
          });
          data = {
            code: 200,
            inserted,
            message: "Success",
          };
        }
      } else {
        data = {
          code: 300,
          message: "Số lượng sách đã hết",
        };
      }
    } else {
      data = {
        code: 300,
        message: "Sách không tồn tại trong thư viện",
      };
    }
    return data;
  }

  async getHistory({ userId, query }) {
    // lấy tất cả trang thái
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * 4;
    const name = query && query.name ? query.name : "";
    const data = await db("stores")
      .innerJoin("books", "stores.bookId", "books.id")
      .where("stores.userId", userId)
      .whereILike("books.name", `%${name}%`)
      .limit(4)
      .offset(skip);
    // đếm tổng số bản ghi
    const [totalRow] = await db("stores")
      .innerJoin("books", "stores.bookId", "books.id")
      .where("stores.userId", userId)
      .whereILike("books.name", `%${name}%`)
      .count();
    // tính tổng số page
    const totalPage = Math.ceil(Object.values(totalRow)[0] / 4);
    return {
      code: 200,
      message: "success",
      data,
      totalPage,
    };
  }
  async getBookBorrow(userId, query) {
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * 4;
    const name = query && query.name ? query.name : "";
    // lấy ra thông tin sách và user ở trạng thái S2(đang mượn), mặc định 5 bản ghi mỗi trang
    const borrows = await db("stores")
      .innerJoin("books", "stores.bookId", "books.id")
      .where("stores.userId", userId)
      .andWhere("stores.status", "S2")
      .whereILike("books.name", `%${name}%`)
      .limit(4)
      .offset(skip);
    // đếm tổng số bản ghi
    const [totalBorrow] = await db("stores")
      .innerJoin("books", "stores.bookId", "books.id")
      .count()
      .where("stores.userId", userId)
      .andWhere("stores.status", "S2")
      .whereILike("books.name", `%${name}%`);
    // tính tổng số trang
    const totalPage = Math.ceil(Object.values(totalBorrow)[0] / 4);
    return {
      code: 200,
      message: "success",
      page,
      totalPage,
      borrows,
    };
  }

  async getStoreByBookId({ userId, bookId }) {
    const data = await db("stores")
      .where({
        userId,
        bookId,
      })
      .first();
    return {
      code: 200,
      message: "Success",
      data,
    };
  }
}
module.exports = new StoreService();
