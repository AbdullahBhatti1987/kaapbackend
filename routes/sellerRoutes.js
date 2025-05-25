import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Seller from "../models/Seller.js";
import { verifySeller } from "../middleware/sellerAuth.js";
import { sendOTP } from "../utils/sendEmail.js";
import { sendSMS } from "../utils/sendSMS.js";

const router = express.Router();

// Seller Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, shopName, shopAddress, password } =
      req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingSeller = await Seller.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingSeller) {
      return res
        .status(400)
        .json({ message: "Seller with email or phone already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const seller = new Seller({
      fullName,
      email,
      phone,
      shopName,
      shopAddress,
      password: hashed,
    });

    await seller.save();
    res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// // Seller Login with Email or Phone (2-step)
// router.post("/login", async (req, res) => {
//   const JWT_SECRET = process.env.JWT_SECRET;
//   try {
//     const { identifier, password } = req.body; // identifier can be email or phone

//     const seller = await Seller.findOne({
//       $or: [{ email: identifier }, { phone: identifier }],
//     });

//     if (!seller) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: seller._id }, JWT_SECRET, { expiresIn: "1d" });

//     res.json({
//       token,
//       seller: {
//         id: seller._id,
//         fullName: seller.fullName,
//         email: seller.email,
//         phone: seller.phone,
//         shopName: seller.shopName,
//         shopAddress: seller.shopAddress,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/login", async (req, res) => {
  const { identifier, otp, password } = req.body;

  const seller = await Seller.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  if (!seller) return res.status(404).json({ message: "Seller not found" });

  const isMatch = await bcrypt.compare(password, seller.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  if (!otp || seller.otp !== otp || seller.otpExpiry < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  seller.otp = null;
  seller.otpExpiry = null;
  await seller.save();

  const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    token,
    seller: {
      id: seller._id,
      fullName: seller.fullName,
      email: seller.email,
      phone: seller.phone,
      shopName: seller.shopName,
      shopAddress: seller.shopAddress,
    },
  });
});

// Optional: Get All Sellers
router.get("/sellers", async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password");
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Request OTP Step

router.post("/request-otp", async (req, res) => {
  const { identifier } = req.body;

  const seller = await Seller.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  if (!seller) return res.status(404).json({ message: "Seller not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  seller.otp = otp;
  seller.otpExpiry = otpExpiry;
  await seller.save();

  if (seller.email === identifier) {
    await sendOTP(seller.email, otp);
  } else if (seller.phone === identifier) {
    try {
      await sendSMS(seller.phone, `Your OTP is: ${otp}`);
    } catch (e) {
      console.error("SMS error:", e);
      return res.status(500).json({ message: "Failed to send OTP via SMS" });
    }
  }

  res.json({ message: "OTP sent" });
});

// Protected seller route
router.get("/dashboard", verifySeller, async (req, res) => {
  const seller = await Seller.findById(req.sellerId).select("-password");
  res.json(seller);
});

export default router;
