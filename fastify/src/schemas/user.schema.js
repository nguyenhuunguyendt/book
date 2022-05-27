const schema = require("./index");
const registerSchema = {
  body: {
    type: "object",
    properties: {
      password: { type: "string", minLength: 4 },
      email: { type: "string", format: "email" },
    },
    required: ["password", "email"],
  },
  response: schema.response,
};

const loginSchema = {
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
    required: ["email", "password"],
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

const forgotPasswordSchema = {
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
    },
    required: ["email"],
  },
  response: schema.response,
};

const changePasswordSchema = {
  body: {
    type: "object",
    properties: {
      passwordOld: { type: "string" },
      passwordNew: { type: "string", minLength: 4 },
    },
    required: ["passwordOld", "passwordNew"],
  },
  response: schema.response,
};

const resetPasswordfromEmailSchema = {
  params: {
    type: "object",
    properties: {
      userId: { type: "integer" },
      tokenForgotPass: { type: "string" },
    },
    required: ["userId", "tokenForgotPass"],
  },
  body: {
    type: "object",
    properties: {
      passwordNew: { type: "string" },
    },
    required: ["passwordNew"],
  },
  response: schema.response,
};
const logoutSchema = {
  response: schema.response,
};
module.exports = {
  registerSchema,
  loginSchema,
  activeSchema,
  forgotPasswordSchema,
  changePasswordSchema,
  resetPasswordfromEmailSchema,
  logoutSchema,
};
