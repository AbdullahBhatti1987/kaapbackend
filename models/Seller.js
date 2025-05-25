import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  shopName: String,
  shopAddress: String,
  password: String,
  otp: String,
  otpExpiry: Date,
});

export default mongoose.model("Seller", SellerSchema);
