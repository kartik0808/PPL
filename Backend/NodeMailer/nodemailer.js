const nodemailer = require("nodemailer");
const config = require("../Config/config");

module.exports = {
  main: async function (email) {
    console.log("Nodemailer is running");
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email,
        pass: config.password,
      },
    });

    const randomVerifictionCode = Math.floor(Math.random() * 1000000);

    let info = await transporter.sendMail({
      from: config.email,
      to: email,
      subject: "Request for Password Reset",
      html:
        "<b>Your verfication code is: </b>" +
        randomVerifictionCode +
        "<br/><br/><b>Kindly ignore this email if this request was not made by you.</b>",
    });

    transporter.sendMail(info, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log('Email sent successfully');
      }
    });

    return randomVerifictionCode;
  },
};
