const fastify = require("fastify")(/*{ logger: true }*/);
const path = require("path");
const pathDelete = __dirname;
require("dotenv").config();
const PORT = process.env.PORT;

const multer = require("fastify-multer");
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads"),
  prefix: "/public/",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Math.ceil(Math.random() * 1000000000) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
fastify.register(multer.contentParser);
fastify.register(require("./plugins"));
fastify.register(require("./middlewares/auth"));

fastify.register(require("./routers"), { prefix: "/api" });

const startServer = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
};
startServer();
module.exports = { fastify, upload, pathDelete };
