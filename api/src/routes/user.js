const express = require('express')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')
const passport = require('passport')

const router = express.Router();


router.get('/data', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userData = {
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role
    }
    response.success(req, res, userData)
})
  

module.exports = router