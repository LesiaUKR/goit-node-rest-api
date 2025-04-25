// helpers/emailService.js
import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD, BASE_URL } = process.env;

if (!UKR_NET_EMAIL || !UKR_NET_PASSWORD) {
  throw new Error("Email or password not defined in environment variables");
}

const transport = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;
  
  const mailOptions = {
    from: UKR_NET_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `
      <h1>Email Verification</h1>
      <p>Please verify your email by clicking on the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };
  
  await transport.sendMail(mailOptions);
};