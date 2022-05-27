const BookController = require("../controllers/book.controller");
const {
  getDetailBookSchema,
  getBookSchema,
} = require("../schemas/book.schema");

module.exports = (fastify, opts, done) => {
  fastify.get("/", { schema: getBookSchema }, BookController.getBook);

  fastify.get(
    "/:id",
    { schema: getDetailBookSchema },
    BookController.getDetailBook
  );

  done();
};
