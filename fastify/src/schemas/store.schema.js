const schema = require("./index");
const createStoreSchema = {
  body: {
    type: "object",
    properties: {
      bookId: { type: "integer" },
    },
    required: ["bookId"],
  },
  response: schema.response,
};

const getHistorySchema = {
  response: schema.response,
};
const getBookBorrowSchema = {
  response: schema.response,
};
const getStoreByBookIdSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: schema.response,
};
module.exports = {
  createStoreSchema,
  getHistorySchema,
  getBookBorrowSchema,
  getStoreByBookIdSchema,
};
