const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    },
});

export default function handler (req, res) {
    if (!transporter) {
        return res.status(500).send('Mail is undefined');
    }
    const lines = Object.entries(req.body)
        .map(([key, val]) => `<p><b>${key}: </b>${val}</p>`)
        .join('\n');

    const html = sanitizeHtml(`<h2> Message from  form: </h2>${lines}`);

    const options = {
        from: process.env.EMAIL_ADRESS,
        to: process.env.EMAIL_ADRESS,
        subject: 'WEB LAB 2',
        html: html
    };

    transporter.sendMail(options, (error) => {
        if (error) {
            console.error('Error sending mail', error.message);
            return res.status(500).json({ code: '500', error: error.message });
        }
        return res.status(200).json({ data: 'ok' });
    });
}
