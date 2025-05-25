import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or another SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (to, otp) => {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: ${otp}</h2><p>This OTP expires in 5 minutes.</p>`,
  });
};
