const jwt = require("jsonwebtoken");

exports.checkUser = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({ success: false, msg: "Kripya pehle login karein" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decodedToken;

    // Code to check if user exists with this ID and active status
    // You can replace this with your actual logic to check if user exists and is active
    const userExistsAndActive = true; // Set this based on your actual logic

    if (!userExistsAndActive) {
      // If user does not exist or is not active, clear the token and logout
      res.clearCookie("token");
      return res.status(401).json({ success: false, msg: "User credentials invalid or account deleted" });
    }

    const newToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token 1 ghante ke liye valid rahega
    });

    res.cookie("token", newToken, {
      path: "/",
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 60 * 60), // 1 ghante ki expiration
      sameSite: "lax",
    });

    res.status(200).json({ success: true, msg: "User logged in", user: decodedToken });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};
