const BookService = require("../services/book.service");
const fastify = require("../server");
class BookController {
  async getBook(req, reply) {
    try {
      const data = await BookService.getBook(req.query);
      reply.code(200).send(data);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again !",
      });
    }
  }
  async getDetailBook(req, reply) {
    try {
      const data = await BookService.getDetailBook(req.params.id);
      reply.code(200).send(data);
    } catch (error) {
      reply.code(200).send({
        code: 300,
        message: "please try again !",
      });
    }
  }
}
module.exports = new BookController();
