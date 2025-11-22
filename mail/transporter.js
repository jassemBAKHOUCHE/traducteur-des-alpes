import nodemailer from "nodemailer";

export let transporter = null;

console.log("📌 SMTP CHECK:");
console.log("HOST:", process.env.SMTP_HOST);
console.log("USER:", process.env.SMTP_USER);
console.log("PASS:", process.env.SMTP_PASS ? "(exists)" : "(missing)");
console.log("SECURE:", process.env.SMTP_SECURE);
console.log("LOADED:", process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}
