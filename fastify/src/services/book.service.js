const db = require("../db/db");
class BookService {
  async getBook(query) {
    const author = query.author || "";
    const name = query.name || "";
    const year = query.year || "";
    const type = query.type || "";
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * 12;
    const books = await db("books")
      .whereILike("author", `%${author}%`)
      .andWhereILike("name", `%${name}%`)
      .andWhereILike("year", `%${year}%`)
      .andWhereILike("type", `%${type}%`)
      .limit(12)
      .offset(skip);
    let [totalBook] = await db("books")
      .whereILike("author", `%${author}%`)
      .andWhereILike("name", `%${name}%`)
      .andWhereILike("year", `%${year}%`)
      .andWhereILike("type", `%${type}%`)
      .count();
    totalBook = Object.values(totalBook)[0];
    const totalPage = Math.ceil(totalBook / 12);
    return {
      code: 200,
      totalPage,
      page,
      books,
    };
  }

  async getDetailBook(id) {
    const book = await db("books").where({ id }).first();
    return {
      code: 200,
      book,
    };
  }
}
module.exports = new BookService();
