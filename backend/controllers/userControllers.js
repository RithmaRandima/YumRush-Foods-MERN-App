import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "This user dosent exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user.id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log("Error on loginUser function", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// register User
export const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // check if email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validation email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email!" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password!",
      });
    }

    // hashing user password using bcrypt to encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log("Error on registerUser function", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
