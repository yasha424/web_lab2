const nodemailer = require('nodemailer');

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
    const options = {
        from: `"Fred Foo 👻" ${process.env.EMAIL_ADRESS}`, // sender address
        to: `${process.env.EMAIL_ADRESS}`, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(options, (error) => {
        if (error) {
            console.error('Error sending mail', error.message);
            return res.status(500).json({ code: '500', error: error.message });
        }
        return res.status(200).json({ data: 'ok' });
    });
}
