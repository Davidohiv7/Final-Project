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
    GOOGLE_CLIENT_SECRET
} = process.env

router.get('/', (req, res, next) => {
    res.send('this is the email sender route')
})

router.post('/', async (req, res) => {
    const { email, name, lastName } = req.body;

    contentHTML = `
    <h1>Welcome ${name} ${lastName}</h1>
    <h5>Your account ${email} has been created</h5>
    `
    //console.log(contentHTML);
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, //with SSL
        auth: {
            type: 'OAuth2',
            user: 'user@example.com',
            serviceClient: '113600000000000000000',
            privateKey: GOOGLE_CLIENT_ID,
            accessToken: GOOGLE_CLIENT_SECRET,
            expires: 1484314697598
        }
    });

    return response.success(req, res, "somos nosotros", 200)
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