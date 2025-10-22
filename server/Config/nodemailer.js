import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: "587",
  secure: false,
  auth: {
    user: process.SMTP_USER,
    pass: process.SMTP_PASS,
  },
  timeout: 10000,
});
export default transporter;
