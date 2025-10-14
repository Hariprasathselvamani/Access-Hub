import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: "465",
  secure: true,
  auth: {
    user: "95145e001@smtp-brevo.com",
    pass: "v3TCGRy1JcSnwjrK",
  },
  timeout: 10000,
});
export default transporter;
