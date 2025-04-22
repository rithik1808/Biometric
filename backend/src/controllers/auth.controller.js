import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      console.log(user, "User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      console.log(user, "Invalid User Data");
      return res.status(400).json({
        success: false,
        message: "Invalid User Data",
      });
    }

    const savedUser = await newUser.save();

    await generateToken(savedUser._id, res);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      },
    });
  } catch (error) {
    console.log("Error while signup", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log(req.body, "All Fields are required");
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      console.log(email, "Invalid Credentials");
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(password, "Invalid Credentials");
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    await generateToken(user._id, res);
    user.lastLogin = Date.now();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      },
    });
  } catch (error) {
    console.log("Error while signin", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
