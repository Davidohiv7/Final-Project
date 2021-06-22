const passport = require('passport');
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const models = require('../database/models')

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} = process.env
const GOOGLE_CALLBACK_URL = 'http://localhost:3001/googleauth/callback'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, cb) => {

    const googleUser = {
        email: profile.emails[0].value,
        name: profile.name.givenName,
        lastName: profile.name.familyName,
        password: '1234',
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    try {
        const user = await models.Person.findOrCreate({where: { email: profile.emails[0].value}, defaults: googleUser})
        if(user && user[0]) {
            return cb(null, user)
        }
    } catch (error) {
        console.log('Error signing Up')
        cb(error, null)
    }
    


}));