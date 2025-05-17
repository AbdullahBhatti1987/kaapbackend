// import mongoose from 'mongoose'
// const bcrypt  from ('bcryptjs')

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false
//   }
// }, {
//   timestamps: true
// })

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next()
//   }
//   this.password = await bcrypt.hash(this.password, 10)
//   next()
// })

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password)
// }

// module.exports = mongoose.model('User', userSchema)
// import bcrypt from "bcrypt"

import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Password verification method
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

export default mongoose.model("User", userSchema);
