const router = require('express').Router();
const { authMailing, transporter } = require('../mailingMid/NodemailerGoogleMid');
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const response = require('../utils/response');

const { SECRET_KEY_JWT, GOOGLE_MAIL } = process.env;

router.post('/getKey', async (req, res, next) => {
    const { email } = req.body;
    try {
        const person = await models.Person.findOne({ where: { email }});
        if(!person) {
            response.success(null, res);
        } else {
            const { id, email } = person;
            const token = jwt.sign({ id, email }, SECRET_KEY_JWT, { expiresIn: 300 });
            transporter.sendMail({
                from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
                to: person.email,
                subject: 'Password reset requested',
                html: `<a href='http://localhost:3000/passwordReset?token=${token}'>Reset password</a>`,
                auth: authMailing
            });
            response.success(null, res);
        }
    } catch (error) {
        response.error(null, res);
    }
});

router.post('/verifyKey', (req, res, next) => {
    const { token } = req.body;
    if(!token) {
        response.error(null, res, 'Not token supplied', 404);
    } else {
        jwt.verify(token, SECRET_KEY_JWT, function(error, data) {
            if(!error) {
                response.success(null, res, data);
            } else {
                console.log(error);
                response.error(null, res, error);
            }
        });
    }
});

module.exports = router;