const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("📧 Starting email debug...");
console.log("✅ Loaded EMAIL_USER:", process.env.EMAIL_USER);
console.log("✅ Loaded EMAIL_PASS:", process.env.EMAIL_PASS ? "Exists" : "Not Found");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function debugEmail() {
    console.log("🚀 Preparing to send email...");

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "yourpersonalemail@example.com",
            subject: "Debug Email",
            html: "<p>Testing Nodemailer!</p>"
        });

        console.log("✅ Email sent successfully:", info.response);
    } catch (error) {
        console.error("❌ Email error:", error);
    }
}

// 🚨 Manually call the function with debugging logs
console.log("⏳ Calling debugEmail() function...");
debugEmail();
console.log("🎯 Finished script execution.");

