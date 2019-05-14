const nodemailer = require('nodemailer');
const config     = require('../config');

module.exports = class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });
    }

    send(email, username, token, callback_func) {
        this.transporter.sendMail({
            from: 'no-reply@matcha.ua',
            to: email,
            subject: 'Activation',
            html: `
<h3>Hi</h3> <strong>${username}</strong>, and welcome.<br>
Here is an activation <a href="${config.host}:${config.port}/activate/${token}">Link</a><br>
Love, Matcha. ♥
`
        }, callback_func);
    }

    resend(email, username, token, callback_func) {
        this.transporter.sendMail({
            from: 'no-reply@matcha.ua',
            to: email,
            subject: 'New activation',
            html: `
<h3>Hi</h3> <strong>${username}</strong> it seems you lost your activation link<br>
(ಠ︵ಠ)<br>
Here is your new activation <a href="${config.host}:${config.port}/activate/${token}">Link</a><br>
Don't lose it. Again.<br>
Love, Matcha. ♥
`
        }, callback_func);
    }

    remind(email, username, token, callback_func) {
        this.transporter.sendMail({
            from: 'no-reply@matcha.ua',
            to: email,
            subject: 'New password',
            html: `
<h3>Hi</h3> <strong>${username}</strong> here is <a href="${config.host}:${config.port}/password/${token}">Link</a>
to reset your password.<br>
Don't forget your passwords, please.<br>
Love, Matcha. ♥
`
        }, callback_func);
    }
};