import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    const user = new User({ name, email, password: hashed });
    await user.save();
    console.log("req=>3", req.body);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
