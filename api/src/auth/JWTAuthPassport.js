const passport = require('passport')
const passportJwt = require('passport-jwt')
const ExtractJwt = passportJwt.ExtractJwt
const StrategyJwt = passportJwt.Strategy

const models = require('../database/models')

const { SECRET_KEY_JWT } = process.env

passport.use(
    new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_KEY_JWT
    }, async (jwtPayload, done) => {
        try {
            const user = await models.User.findOne({where: {id: jwtPayload.id}})
            return done(null, user)
        } catch (error) {
            return done(error)
        }
        
    })
)