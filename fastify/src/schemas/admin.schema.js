const schema = require("./index");
const createBookSchema = {
  body: {
    type: "object",
    properties: {
      type: { type: "string" },
      year: { type: "integer", minium: 1800 },
      author: { type: "string" },
      quantity: { type: "integer", minium: 0 },
      name: { type: "string" },
      image: { type: "string" },
    },
    required: ["type", "year", "author", "quantity", "name", "image"],
  },
  response: schema.response,
};

const deleteBookSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: schema.response,
};

const updateBookSchema = {
  prams: {
    type: "object",
    properties: { id: { type: "integer" } },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      type: { type: "string" },
      year: { type: "integer", minium: 1800 },
      author: { type: "string" },
      quantity: { type: "integer", minium: 0 },
      name: { type: "string" },
      image: { type: "string" },
    },
  },
  response: schema.response,
};
const getAllUserSchema = {
  querystring: {
    type: "object",
  },
  response: schema.response,
};

const activeSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: schema.response,
};
const getHistorySchema = {
  querystring: {
    type: "object",
  },
  response: schema.response,
};
const approveBookSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: schema.response,
};
const getStorebyIdUserSchema = {
  querystring: {
    type: "object",
  },
  params: {
    type: "object",
    properties: {
      userId: { type: "integer" },
    },
    required: ["userId"],
  },
  response: schema.response,
};
const approveGiveBookSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: schema.response,
};
const resetPasswordSchema = {
  body: {
    type: "object",
    properties: {
      passwordNew: { type: "string" },
    },
    required: ["passwordNew"],
  },
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: schema.response,
};

const canCelBookSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: schema.response,
};
const importFileCsvSchema = {
  body: {
    type: "object",
    properties: {
      books: { type: "array" },
    },
    required: ["books"],
  },
};
module.exports = {
  createBookSchema,
  deleteBookSchema,
  updateBookSchema,
  activeSchema,
  getHistorySchema,
  approveBookSchema,
  getStorebyIdUserSchema,
  approveGiveBookSchema,
  resetPasswordSchema,
  getAllUserSchema,
  canCelBookSchema,
  importFileCsvSchema,
};
