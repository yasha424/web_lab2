const nodemailer = require('nodemailer');
// const sanitizeHtml = require('sanitize-html');

const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_ADRESS, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    },
});

export default function handler (req, res) {
    if (!transporter) {
        return res.status(500).send('Mail is undefined');
    }
    // const lines = Object.entries(req.body.message)
    //     .map(([key, val]) => `<p><b>${key}: </b>${val}</p>`)
    //     .join('\n');

    // const html = sanitizeHtml(`<h2> Message from  form: </h2>${lines}`);
    const html = '';
    const options = {
        from: `${process.env.EMAIL_ADRESS}`, // sender address
        to: `${process.env.EMAIL_ADRESS}`, // list of receivers
        subject: 'WEB LAB 2',
        html: html // html body
    };

    transporter.sendMail(options, (error) => {
        if (error) {
            console.error('Error sending mail', error.message);
            return res.status(500).json({ code: '500', error: error.message });
        }
        return res.status(200).json({ data: 'ok' });
    });
}
