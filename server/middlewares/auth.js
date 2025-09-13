import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import jwt from 'jsonwebtoken'


const protect = async (req, res, next) => {
    const token = req.headers.authorization || req.cookies?.token;
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
