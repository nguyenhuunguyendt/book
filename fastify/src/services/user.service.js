const bcrypt = require("bcryptjs");
const utils = require("../utils");
const db = require("../db/db");
const { fastify } = require("../server");
const { v4: uuidv4 } = require("uuid");
const { sendEmail, hashUserPassword } = require("../utils");

class UserService {
  async register({ email, password }) {
    let data;
    const users = await db("users").where({ email }).first();
    if (users) {
      data = {
        code: 300,
        message: "Người dùng đã tồn tại",
      };
    } else {
      const hashpassword = await hashUserPassword(password);
      const [inserted] = await db("users").insert({
        email,
        password: hashpassword,
      });
      data = {
        code: 200,
        inserted,
        message: "success",
      };
    }
    return data;
  }

  async login({ email, password }) {
    let data;
    const user = await db("users").where({ email }).first();
    if (!user) {
      data = {
        code: 300,
        message: "Người dùng không tồn tại trong hệ thống",
      };
    } else {
      if (user.wrongPassword > 5) {
        const currentTime = Date.now();
        const timeAgain = Math.floor(currentTime / 1000 + 5 * 60);
        await db("users")
          .where({ email })
          .update({ timeAgain, wrongPassword: 0 });
        // thời gian phải chờ
        const waitTime = Math.floor(timeAgain - currentTime / 1000);
        data = {
          code: 300,
          message: "Bạn đã vượt quá số lần đăng nhập vui lòng thử lại sau !",
          waitTime,
        };
      } else {
        const currentTime = Date.now();
        // nếu timeAgain trong table vẫn lớn hơn time hiện tại
        if (user.timeAgain > Math.floor(currentTime / 1000)) {
          const waitTime = Math.floor(user.timeAgain - currentTime / 1000);
          data = {
            code: 300,
            message: "Bạn đã vượt quá số lần đăng nhập vui lòng thử lại sau ! ",
            waitTime,
          };
        } else {
          const check = bcrypt.compareSync(password, user.password);
          // nếu đúng cập nhật lại số lần sai pass = 0 và timeAgain = null
          if (check) {
            await db("users")
              .where({ email })
              .whereNot({ wrongPassword: 0 })
              .update({ wrongPassword: 0 });
            const token = fastify.jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              { expiresIn: "1d" }
            );
            data = {
              code: 200,
              token,
              message: "success",
            };
          } else {
            // sai mật khẩu tăng lên 1
            await db("users")
              .where("email", email)
              .increment("wrongPassword", 1);
            data = {
              code: 300,
              message: "Sai mật khẩu !",
              numberWrong: user.wrongPassword + 1,
            };
          }
        }
      }
    }
    return data;
  }

  async changePassword({ passwordOld, passwordNew }, { id, email }) {
    let data = {};
    const user = await db("users").where({ id, email }).first();
    if (user) {
      let check = bcrypt.compareSync(passwordOld, user.password);
      if (check) {
        const hashpassword = await utils.hashUserPassword(passwordNew);
        const userUpdated = await db("users")
          .where({ id, email })
          .update({ password: hashpassword });
        data = {
          code: 200,
          userUpdated,
        };
      } else {
        data = {
          code: 400,
          message: "Mật khẩu sai !",
        };
      }
    } else {
      data = {
        code: 400,
        message: "Người dùng không tồn tại trong hệ thống",
      };
    }
    return data;
  }

  async forgotPassword({ email }) {
    let data;
    const user = await db("users").where({ email }).first();
    // kiem tra user, gửi token qua mail
    if (user) {
      const tokenForgotPass = uuidv4();
      const linkResetPassword = `http://localhost:8080/forgot-pass/${user.id}/${tokenForgotPass}`;
      await db("users").where({ id: user.id }).update({ tokenForgotPass });
      await utils.sendEmail({
        email,
        linkResetPassword,
      });
      data = {
        code: 200,
        message: "Đã gửi mail vui lòng kiểm tra lại mail của bạn",
      };
    } else {
      data = {
        code: 300,
        message: "Người dùng không tồn tại",
      };
    }
    return data;
  }

  async resetPasswordfromEmail({ userId, tokenForgotPass, passwordNew }) {
    let data;
    const user = await db("users")
      .where({
        id: userId,
        tokenForgotPass,
      })
      .first();
    // kiem tra user va token co hop le
    if (user) {
      const hashpassword = await utils.hashUserPassword(passwordNew);
      // update password , reset token -> null
      const updated = await db("users")
        .where({
          id: userId,
          tokenForgotPass,
        })
        .update({ password: hashpassword, tokenForgotPass: null });
      data = {
        code: 200,
        message: "success",
        updated,
      };
    } else {
      data = {
        code: 300,
        message: "Token hoặc userId không hợp lệ",
      };
    }
    return data;
  }

  async authentication(userInput) {
    const user = await db("users")
      .where({ id: userInput.id, email: userInput.email })
      .first();
    return {
      user,
      code: 200,
      message: "success",
    };
  }
}
module.exports = new UserService();
