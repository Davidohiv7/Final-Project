const {
    Router
} = require('express');
const nodemailer = require('nodemailer')
//const { response } = require('../app');
const router = Router();
//const models = require('../database/models/');
const response = require('../utils/response');
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    GOOGLE_ACCES_TOKEN,
    GOOGLE_MAIL,
} = process.env

router.get('/', (req, res, next) => {
    res.send('this is the email sender route')
})

router.post('/signup', async (req, res) => {
    const { email, name, lastName } = req.body;

    contentHTML = `
    <h1>Welcome ${name} ${lastName}</h1>
    <h5>Your account ${email} has been created</h5>
    `
    //console.log(contentHTML);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId:  GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }
    });

    transporter.sendMail({
        from: GOOGLE_MAIL,
        to: email,
        subject: 'Welcome to Onion Food Sup.',
        text: 'I hope this message gets through!',
        auth: {
            user: GOOGLE_MAIL,
            refreshToken: GOOGLE_REFRESH_TOKEN,
            accessToken: GOOGLE_ACCES_TOKEN,
            expires: 3599
        }
    });

    return response.success(req, res, "email sent", 200)
    //let categories = await models.Category.findAll()
    //return response.success(req, res, categories, 200)
})

/*
router.post('/', async (req, res) => {
    models.Category.create({
        name: req.body.name
    })
    return response.success(req, res, null, 200)
})*/

module.exports = router;