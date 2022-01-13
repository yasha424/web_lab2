const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const sanitizeHtml = require('sanitize-html');

const transporter = nodemailer.createTransport(smtpTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
    },
}));

const rateLimit = {
    ipNumberCalls: 3,
    timeSeconds: 30,
    ipData: new Map()
};

export default function handler (req, res) {
    if (!transporter) {
        return res.status(501).json({ error: 'Mail is undefined' });
    }

    const currentTime = new Date();
    const currentIp = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
    let currentIpUser = rateLimit.ipData.get(currentIp);

    if (!currentIpUser) {
        currentIpUser = {
            count: 0,
            time: currentTime - (rateLimit.timeSeconds + 1) * 1000
        };
    }

    if (currentIpUser.count + 1 > rateLimit.ipNumberCalls &&
        currentTime - currentIpUser.time <= rateLimit.timeSeconds * 1000) {
        return res.status(429).json({ error: 'Too many requests' });
    }

    if (currentTime - currentIpUser.time > rateLimit.timeSeconds * 1000) {
        currentIpUser.count = 0;
    }

    currentIpUser.count++;
    currentIpUser.time = new Date();
    rateLimit.ipData.set(currentIp, currentIpUser);

    const lines = Object.entries(req.body)
        .map(([key, val]) => `<p><b>${key}: </b>${val}</p>`)
        .join('\n');

    const html = sanitizeHtml(`<h2> Message from form </h2>${lines}`);

    const options = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: 'WEB LAB 2',
        html: html
    };

    transporter.sendMail(options, (error) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data: 'ok' });
    });
}
