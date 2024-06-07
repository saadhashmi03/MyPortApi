const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup route
exports.signup = async (req, res) => {
  // getting user data from req.body

  const { name, email, password } = req.body;

  let user;

  try {
    // checking if user already exists

    user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // hashing the password

    const securePassword = await bcrypt.hash(password, 10);

    // creating a new user

    user = await User.create({
      name,
      email,
      password: securePassword,
    });

    // saving user to db

    await user.save();

    return res
      .status(200)
      .json({ success: true, msg: "User saved successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // checking if user exists
    let user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ success: false, msg: "Please sign up " });

    // checking  if password matches

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    //if password does not match
    if (!isPasswordMatch)
      return res
        .status(404)
        .json({ success: false, msg: "incorrect credentials" });

    //if password matches

    // check if "token " cookie exists in the request

    const existingToken = req.cookies.token;

    if (existingToken) {
      // clear the existing token cookie
      res.clearCookie("token");
    }

    // creating a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // sending token in cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true, // client side (js) cannot access cookie
      expiresIn: new Date(Date.now() + 1000 * 60 *60 *24 *7), // expire in 30s
      sameSite: "lax",
    });

    return res.status(200).json({ success: true, msg: "logged in " });
  } catch (error) {
    return res.status(404).json({ success: false, msg: error.message });
  }
};

exports.logout= async (req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({ success: true, msg:"Logged out successfully" });
        
    } catch (error) {
        return res.status(500).json({ success: false, msg:error.message})
        
    }
}