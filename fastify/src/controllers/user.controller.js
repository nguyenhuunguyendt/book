const UserService = require("../services/user.service");
class UserController {
  async register(req, reply) {
    try {
      const data = await UserService.register(req.body);
      reply.code(200).send(data);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "please try again ! ",
      });
    }
  }
  async authentication(req, reply) {
    try {
      const data = await UserService.authentication(req.user);
      reply.code(200).send(data);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "please try again ! ",
      });
    }
  }
  async login(req, reply) {
    try {
      const data = await UserService.login(req.body);
      if (data.token) {
        reply.setCookie("accessToken", data.token, {
          domain: "localhost",
          path: "/",
          httpOnly: true,
          // signed: true,
          // secure: true,
          // sameSite: false,
          maxAge: 180000000,
        });
      }
      reply.code(200).send(data);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "please try again ! ",
      });
    }
  }

  async changePassword(req, reply) {
    try {
      const { passwordOld, passwordNew } = req.body;
      const data = await UserService.changePassword(
        { passwordOld, passwordNew },
        req.user
      );
      reply.code(200).send(data);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "please try again ! ",
      });
    }
  }

  async forgotPassword(req, reply) {
    try {
      const data = await UserService.forgotPassword(req.body);
      console.log(data);
      reply.code(200).send(data);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "please try again ! ",
      });
    }
  }
  async resetPasswordfromEmail(req, reply) {
    try {
      console.log(req.params);
      const data = await UserService.resetPasswordfromEmail({
        tokenForgotPass: req.params.tokenForgotPass,
        userId: req.params.userId,
        passwordNew: req.body.passwordNew,
      });
      reply.code(200).send(data);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "please try again ! ",
      });
    }
  }

  async logout(req, reply) {
    try {
      reply.clearCookie("accessToken");
      reply.code(200).send({
        code: 200,
        message: "success",
      });
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "please try again ! ",
      });
    }
  }
}
module.exports = new UserController();
