const {
  createBookSchema,
  canCelBookSchema,
  deleteBookSchema,
  updateBookSchema,
  activeSchema,
  approveGiveBookSchema,
  getHistorySchema,
  getStorebyIdUserSchema,
  approveBookSchema,
  resetPasswordSchema,
  getAllUserSchema,
  importFileCsvSchema,
} = require("../schemas/admin.schema");
const AdminController = require("../controllers/admin.controller");
const { upload } = require("../server");

module.exports = (fastify, opts, done) => {
  // active-tai khoản
  fastify.put(
    "/active-account/:id",
    {
      schema: activeSchema,
      preValidation: [fastify.authenticate, fastify.authIsAdmin],
    },
    AdminController.active
  );
  // get tất cả user
  fastify.get(
    "/get-all-user",
    {
      schema: getAllUserSchema,
      preValidation: [fastify.authenticate, fastify.authIsAdmin],
    },
    AdminController.getAllUser
  );

  // reset-pass-user
  fastify.put(
    "/reset-password/:id",
    {
      schema: resetPasswordSchema,
      preValidation: [fastify.authenticate, fastify.authIsAdmin],
    },
    AdminController.resetPassword
  );
  //  up-file-ảnh
  fastify.post(
    "/upload-file",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],
      preHandler: upload.single("file"),
    },
    AdminController.upLoadFile
  );
  // thêm sách
  fastify.post(
    "/create-book",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],
      schema: createBookSchema,
    },
    AdminController.createBook
  );
  // xóa sách
  fastify.delete(
    "/delete-book/:id",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],

      schema: deleteBookSchema,
    },
    AdminController.deleteBook
  );
  // sửa sách
  fastify.put(
    "/update-book/:id",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],

      schema: updateBookSchema,
    },
    AdminController.updateBook
  );

  // hủy mượn sách
  fastify.delete(
    "/cancel-borrow-book/:id",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],

      schema: canCelBookSchema,
    },
    AdminController.canCelBook
  );

  fastify.get(
    "/store/history",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],

      schema: getHistorySchema,
    },
    AdminController.getHistory
  );

  fastify.put(
    "/approve-borrow-book/:id",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],

      schema: approveBookSchema,
    },
    AdminController.approveBook
  );

  fastify.get(
    "/store/:userId",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],
      schema: getStorebyIdUserSchema,
    },
    AdminController.getStorebyIdUser
  );

  fastify.put(
    "/approve-give-book/:id",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],
      schema: approveGiveBookSchema,
    },
    AdminController.approveGiveBook
  );

  fastify.post(
    "/import-file-csv",
    {
      preValidation: [fastify.authenticate, fastify.authIsAdmin],
      schema: importFileCsvSchema,
    },
    AdminController.importFileCsv
  );

  done();
};
