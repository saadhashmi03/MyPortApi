const { createTransport } = require("nodemailer");

const sendMessage = async (userMsg) => {
  // important things to know is createTransporter and sendMail

  // setting other transport
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      password: process.env.APP_PASSWORD,
    },

    // sending the message
  });
  const sentMsg = await transporter.sendMail({
    from: process.env.APP_EMAIL,
    to: process.env.APP_EMAIL,
    subject: "New message from Portfolio site",
    text: userMsg,
  });

  return sentMsg;
};
module.exports = { sendMessage };
