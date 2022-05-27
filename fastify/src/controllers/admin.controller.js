const AdminService = require("../services/admin.service");
class AdminController {
  async createBook(req, reply) {
    try {
      console.log(1123);
      const reponse = await AdminService.createBook(req.body);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again !",
      });
    }
  }

  async deleteBook(req, reply) {
    try {
      const reponse = await AdminService.deleteBook(req.params.id);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again !",
      });
    }
  }

  async updateBook(req, reply) {
    try {
      const reponse = await AdminService.updateBook(req.params.id, req.body);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again !",
      });
    }
  }

  async active(req, reply) {
    try {
      const reponse = await AdminService.active(req.params.id);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again ! ",
      });
    }
  }

  async getHistory(req, reply) {
    try {
      const reponse = await AdminService.getHistory(req.query);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }

  async approveBook(req, reply) {
    try {
      const reponse = await AdminService.approveBook(req.params.id);
      reply.code(200).send(reponse);
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
      const reponse = await AdminService.getStorebyIdUser(
        req.params.userId,
        req.query
      );
      reply.code(200).send(reponse);
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
      const reponse = await AdminService.approveGiveBook(req.params.id);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "Server is busy , please try again ",
      });
    }
  }

  async resetPassword(req, reply) {
    try {
      const reponse = await AdminService.resetPassword({
        id: req.params.id,
        passwordNew: req.body.passwordNew,
      });
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again ! ",
      });
    }
  }

  async upLoadFile(req, reply) {
    try {
      const fileSrc = `http://localhost:9999/public/images/${req.file.filename}`;
      reply.code(200).send({
        code: 200,
        message: "success",
        fileSrc,
      });
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again ! ",
      });
    }
  }

  async getAllUser(req, reply) {
    console.log("aaa");
    try {
      const email = req.query.email;
      const reponse = await AdminService.getAllUser(email);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again ! ",
      });
    }
  }
  async canCelBook(req, reply) {
    try {
      const reponse = await AdminService.canCelBook(req.params.id);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again ! ",
      });
    }
  }
  async importFileCsv(req, reply) {
    try {
      const reponse = await AdminService.ImportFileCsv(req.body.books);
      reply.code(200).send(reponse);
    } catch (error) {
      console.log(error);
      reply.code(200).send({
        code: 300,
        message: "please try again ! ",
      });
    }
  }
}
module.exports = new AdminController();
