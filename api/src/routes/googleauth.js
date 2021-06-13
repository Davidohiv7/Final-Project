const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const googleAuthRouter = express.Router();

const { SECRET_KEY_JWT } = process.env

googleAuthRouter.get('/signin', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }))


googleAuthRouter.get('/callback', passport.authenticate('google', { 
    session: false, 
    failureRedirect: 'http://localhost:3000/',
    // successRedirect: 
   }),
    
  (req, res) => {
    const jasonWebToken = jwt.sign({id: req.user.id, email: req.user.email}, SECRET_KEY_JWT)
    res.cookie('jwt', jasonWebToken).redirect('http://localhost:3000/')
  }
);

module.exports = googleAuthRouter