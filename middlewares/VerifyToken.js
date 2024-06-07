const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.verifyToken = async (req, res, next) => {
  // getting token from cookies

  const { token } = req.cookies;

  try {
    // if no token found
    if (!token)
      return res
        .status(401)
        .json({ success: false, msg: "Please login to access this resource" });

    // verification of token

    const user = jwt.verify(token, process.env.JWT_SECRET);

    // adding user id to request object
    req.id = user.id;

    // to proceed further
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, msg: "Invalid token or token expired" });
      
  }
};
