import validator from "validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { token } from "morgan";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
export const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: true,
      error: "please provide an email and password",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "please provide a valid email",
    });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      success: false,
      error: "please provide a strong password",
    });
  }
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        error: "user already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const savedUser = await new User({
      email,
      password: hashedpassword,
    }).save();

    const token = generateToken(savedUser._id);
    res.status(200).json({
      success: true,
       token,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: true,
      error: "please provide an email and password",
    });
  }
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }
    const token =  generateToken(existUser._id);
    res.status(200).json({
        logged:true,
        success:true,
        token
    });

  } catch (e) {
    res.status(500).json({
        success: false,
        error: e.message,
      });
  }
};
