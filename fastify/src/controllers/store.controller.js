const StoreService = require("../services/store.service");
class StoreController {
  async createStore(req, reply) {
    try {
      const response = await StoreService.createStore({
        userId: req.user.id,
        bookId: req.body.bookId,
      });
      reply.code(200).send(response);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }

  async getHistory(req, reply) {
    try {
      const response = await StoreService.getHistory({
        userId: req.user.id,
        query: req.query,
      });
      reply.code(200).send(response);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }
  async getBookBorrow(req, reply) {
    try {
      const userId = req.user.id;
      const response = await StoreService.getBookBorrow(userId, req.query);
      reply.code(200).send(response);
    } catch (error) {
      console.log(error);
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }
  async approveBook(req, reply) {
    try {
      const response = await StoreService.approveBook(req.body.id);
      reply.code(200).send(response);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }

  async getStorebyIdUser(req, reply) {
    try {
      const response = await StoreService.getStorebyIdUser(req.params.userId);
      reply.code(200).send(response);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }
  async approveGiveBook(req, reply) {
    try {
      const response = await StoreService.approveGiveBook(req.body.id);
      reply.code(200).send(response);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }
  async getStoreByBookId(req, reply) {
    try {
      const response = await StoreService.getStoreByBookId({
        userId: req.user.id,
        bookId: req.params.id,
      });
      reply.code(200).send(response);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }
}
module.exports = new StoreController();
