const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')

const signInRouter = express.Router();

const { SECRET_KEY_JWT } = process.env


const models = require('../database/models/');

signInRouter.get('/', (req, res, next) => {
    res.send('Esta es la ruta de sign in')
})
  
signInRouter.post('/', async (req, res, next) => {

    const { email, password} = req.body

    const userExistCheck = await models.User.findOne({ where: { email }})
    if(!userExistCheck || !userExistCheck.password) {
        return response.error(req, res, { message: 'The email or the password does not match' })
    }

    const match = await bcrypt.compare(password, userExistCheck.password);

    if(!match) {
        return response.error(req, res, { message: 'The email or the password does not match' })
    }

    const jasonWebToken = jwt.sign({id: userExistCheck.id, username: userExistCheck.username}, SECRET_KEY_JWT)
    return response.success(req, res, {message: 'Successful log in', token: jasonWebToken})
})

module.exports = signInRouter