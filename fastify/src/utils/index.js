const bcrypt = require("bcryptjs");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { pathDelete } = require("../server");
const fs = require("fs");
const hashUserPassword = async (password) => {
  try {
    let hashpassword = await bcrypt.hashSync(password);
    return hashpassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const sendEmail = async (data) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USE, // generated ethereal user
      pass: process.env.MAIL_APP_PASSWORD, // generated ethereal password
    },
  });
  let html = `Cảm ơn bạn đã ghé qua thư viện .
    Chúng tôi gửi email này để thông báo bạn đã mượn sách thành công.
    Chân thành cảm ơn!`;
  let subject = `Thư thông báo mượn sách`;
  if (data.linkResetPassword) {
    subject = `Reset Password`;
    html = `
        <div>Cick vào đường link bên dưới để thay đổi mật khẩu của bạn</div>
        <a href=${data.linkResetPassword}>Cick here</a>
        `;
  }
  await transporter.sendMail({
    from: `" Quản lý thứ viện " <${process.env.EMAIL_USE}>`, // sender address
    to: data.email, // list of receivers
    subject,
    html,
  });
};

const deleteFile = (imageSrc) => {
  const test = imageSrc.slice(imageSrc.indexOf("file"));
  let strPath = String.raw`${pathDelete}\uploads\images\ ${test}`;
  let path = strPath.replace(/\s/g, "");
  fs.unlinkSync(path);
};
module.exports = {
  hashUserPassword,
  sendEmail,
  deleteFile,
};
