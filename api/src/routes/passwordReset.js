const router = require('express').Router();
const { authMailing, transporter } = require('../mailingMid/NodemailerGoogleMid');
const jwt = require('jsonwebtoken');
const models = require('../database/models');

const { SECRET_KEY_JWT } = process.env;

router.post('/getKey', async (req, res, next) => {
    const { email } = req.body;
    try {
        const person = await models.Person.findOne({ where: { email }});
        console.log(person);
        if(!person) {
            res.send('success');
        } else {
            const { id, email } = user;
            const token = jwt.sign({ id, email }, SECRET_KEY_JWT, { expiresIn: 300 });
            transporter.sendMail({
                from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
                to: user.email,
                subject: 'Password reset requested',
                html: `<a href='http://localhost:3000/resetPassword?token=${token}'>Reset password</a>`,
                auth: authMailing
            });
            res.send('success');
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;