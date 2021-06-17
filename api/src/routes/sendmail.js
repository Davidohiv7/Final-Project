const {
    Router
} = require('express');
const nodemailer = require('nodemailer')
const router = Router();

//util imports
const {
    mailSignUp,
    mailBuy,
    orderStatus,
} = require('../utils/mailtemplates')
const response = require('../utils/response');

//Bring all the IDs, tokens and passwords from the .env
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_ACCES_TOKEN,
    GOOGLE_MAIL,
} = process.env

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET
    }
});


router.get('/', (req, res, next) => {
    res.send('this is the email sender route')
});

router.post('/signup', async (req, res) => {
    const { email, name, lastName, subject } = req.body;

    transporter.sendMail({
        from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
        to: email,
        subject: 'Welcome to Onion Food Sup.',
        html: mailSignUp(name, lastName, email),
        auth: {
            user: GOOGLE_MAIL,
            refreshToken: GOOGLE_REFRESH_TOKEN,
            accessToken: GOOGLE_ACCES_TOKEN,
            expires: 3599
        }
    });

    return response.success(req, res, "email sent", 200)
    //let categories = await models.Category.findAll()
});

router.post('/buy', async (req, res) => {
    const {
        email,
        name,
        lastName,
        subject
    } = req.body;

    transporter.sendMail({
        from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
        to: email,
        subject: subject,
        html: mailBuy(name, lastName, email),
        auth: {
            user: GOOGLE_MAIL,
            refreshToken: GOOGLE_REFRESH_TOKEN,
            accessToken: GOOGLE_ACCES_TOKEN,
            expires: 3599
        }
    });

    return response.success(req, res, "email sent", 200)
    //let categories = await models.Category.findAll()
});

module.exports = router;