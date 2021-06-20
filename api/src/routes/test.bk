const express = require('express')
const passport = require('passport')

const testRouter = express.Router();


testRouter.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send(req.user)
})
  

module.exports = testRouter