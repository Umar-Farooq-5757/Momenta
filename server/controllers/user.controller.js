import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// signup/ register user
const userRegister = async (req, res) => {
  const { username, email, password, bio } = req.body;
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400).json({ success: false, message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic: "",
      bio: bio || {},
    });
    const token = generateToken(user._id);
    return res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    return res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export { userRegister, login };
