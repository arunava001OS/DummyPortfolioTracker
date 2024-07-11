const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
  try {
    const { user_email, user_phone, password } = req.body;
    // check user already present
    const userCheck = await User.findOne({ user_email });
    if (!userCheck) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        user_email: user_email,
        user_phone: user_phone,
        password: hashedPassword,
      });
      await user.save();
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(208).json({ message: "User already present" });
    }
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

const userLogin = async (req, res) => {
  try {
    const { user_email, user_phone, password } = req.body;
    const user = await User.findOne({ user_email });
    if (user) {
      //password matching
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      const token = jwt.sign({ userId: user.user_email }, "#SECRET_KEY", {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ message: "User logged in successfully", token: token });
    } else {
      return res.status(401).json({ message: "User not present . Please signup." });
    }
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

module.exports = { userRegistration, userLogin };
