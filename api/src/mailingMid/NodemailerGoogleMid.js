const nodemailer = require('nodemailer');

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_ACCES_TOKEN,
    GOOGLE_MAIL,
} = process.env

const mailConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
    }
};

exports.transporter = nodemailer.createTransport(mailConfig);

exports.authMailing = {
    user: GOOGLE_MAIL,
    refreshToken: GOOGLE_REFRESH_TOKEN,
    accessToken: GOOGLE_ACCES_TOKEN,
    expires: 3599
}