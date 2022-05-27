const schema = require("./index");
const getBookSchema = {
  querystring: {
    type: "object",
    properties: {
      page: { type: "integer", minium: 1 },
    },
  },
  response: schema.response,
};
const getDetailBookSchema = {
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
  getDetailBookSchema,
  getBookSchema,
};
