const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  changePasswordSchema,
  resetPasswordfromEmailSchema,
  logout,
} = require("../schemas/user.schema");
const UserController = require("../controllers/user.controller");
module.exports = (fastify, opts, done) => {
  fastify.post(
    "/register",
    {
      schema: registerSchema,
    },
    UserController.register
  );

  fastify.post(
    "/login",
    {
      schema: loginSchema,
    },
    UserController.login
  );

  fastify.get(
    "/auth",
    {
      preValidation: [fastify.authenticate],
    },
    UserController.authentication
  );

  fastify.post(
    "/forgot-password",
    {
      schema: forgotPasswordSchema,
    },
    UserController.forgotPassword
  );

  fastify.put(
    "/change-password",
    {
      schema: changePasswordSchema,
      preValidation: [fastify.authenticate],
    },
    UserController.changePassword
  );

  fastify.put(
    "/reset-password-email/:userId/:tokenForgotPass",
    {
      schema: resetPasswordfromEmailSchema,
    },
    UserController.resetPasswordfromEmail
  );

  fastify.post(
    "/logout",
    {
      preValidation: [fastify.authenticate],
      schema: logout,
    },
    UserController.logout
  );

  done();
};
