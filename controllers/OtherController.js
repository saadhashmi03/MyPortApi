const { sendMessage } = require("../middlewares/SendMessage");

exports.contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userMsg = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const sentMsg = await sendMessage(userMsg);
    if (!sendMessage)
      return res.status(400).json({ success: false, msg: "message not send" });

    return res.status(200).json({ success: true, msg: "message  send" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
