import nodemailer from 'nodemailer'
import { html } from './htmlEmail'

const sendEmailContact = async ({ from, name, text }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    })

    const mailOptions = {
        from: from,
        to: process.env.EMAIL_USER,
        subject: 'Contact',
        html: html({ name, text, from })
    }

    const result = await transporter.sendMail(mailOptions)
    return result
}

export default sendEmailContact
