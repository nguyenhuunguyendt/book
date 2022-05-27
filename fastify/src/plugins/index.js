const fp = require("fastify-plugin");
require("dotenv").config();

module.exports = fp(function (fastify, opts, done) {
  fastify.register(require("@fastify/cors"), {
    origin: true,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  });

  fastify.register(require("@fastify/cookie"), {
    secret: process.env.SECRET_COOKIE, // for cookies signature
    parseOptions: {}, // options for parsing cookies
  });

  fastify.register(require("@fastify/jwt"), {
    secret: process.env.ACCESS_TOKEN_SECRET,
    cookie: {
      cookieName: "accessToken",
      signed: false,
    },
  });
  done();
});
