module.exports = (fastify, opts, done) => {
  fastify.register(require("./user.router"), { prefix: "/user" });
  fastify.register(require("./book.router"), { prefix: "/book" });
  fastify.register(require("./strore.router"), { prefix: "/store" });
  fastify.register(require("./admin.router"), { prefix: "/system" });
  done();
};
