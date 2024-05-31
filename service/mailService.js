const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})
async function sendActivateMail (FirstName, to, link) {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Activating your account!',
        text:'',
        html:
            `
                <div>
                    <hr>
                    <h1>Hi, ${FirstName}, glad to see you!</h1>
                    <h2>To activate, follow the link:</h2>
                    <a href="${link}">${link}</a>
                    <hr>
                </div>
            `
    })
}


module.exports = { sendActivateMail }