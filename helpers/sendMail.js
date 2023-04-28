require("dotenv").config();
const nodemailer = require("nodemailer");

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

async function sendMail({ to, html, subject }) {
    const email = {
        from: "info@contactsbook.com",
        to,
        subject,
        html,
    };
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });
    await transport.sendMail(email);
};

module.exports = {
    sendMail,
};