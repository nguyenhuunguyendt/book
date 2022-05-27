const StoreController = require("../controllers/store.controller");
const {
  createStoreSchema,
  getHistorySchema,
  getBookBorrowSchema,
  getStoreByBookIdSchema,
} = require("../schemas/store.schema");
module.exports = (fastify, opts, done) => {
  fastify.post(
    "/",
    {
      preValidation: [fastify.authenticate, fastify.authIsActive],
      schema: createStoreSchema,
    },
    StoreController.createStore
  );

  fastify.get(
    "/history",
    {
      preValidation: [fastify.authenticate],

      schema: getHistorySchema,
    },
    StoreController.getHistory
  );

  fastify.get(
    "/book-borrow",
    {
      preValidation: [fastify.authenticate],
      schema: getBookBorrowSchema,
    },
    StoreController.getBookBorrow
  );

  fastify.get(
    "/get-by-bookId/:id",
    {
      preValidation: [fastify.authenticate],
      schema: getStoreByBookIdSchema,
    },
    StoreController.getStoreByBookId
  );

  done();
};
