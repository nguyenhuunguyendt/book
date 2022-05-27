const db = require("../db/db");
const fp = require("fastify-plugin");
module.exports = fp(function (fastify, opts, done) {
  fastify.decorate("authenticate", async (req, reply) => {
    try {
      const data = await req.jwtVerify();
      req.user = data;
    } catch (error) {
      reply.code(200).send({
        code: error.statusCode,
        message: error.message,
      });
    }
  });

  fastify.decorate("authIsActive", async (req, reply) => {
    try {
      const user = await db("users")
        .where({ id: req.user.id, email: req.user.email })
        .first();
      if (!user || user.isActive !== 1) {
        reply.code(200).send({
          code: 300,
          message: "Tài khoản  chưa được kích hoạt",
        });
      }
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "Lỗi chưa xác định được vui lòng thử  lại sau",
      });
    }
  });

  fastify.decorate("authIsAdmin", async function (req, reply) {
    try {
      const user = await db("users")
        .where({ id: req.user.id, email: req.user.email })
        .first();
      if (!user || !user.isAdmin === 1) {
        reply.code(200).send({
          code: 401,
          message: "người dùng không có quyền",
        });
      }
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 600,
        message: "lỗi chưa xác định được vui lòng thử  lại sau",
      });
    }
  });
  done();
});
