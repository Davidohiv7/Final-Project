const express = require('express')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')
const signUpRouter = express.Router();
const bcrypt = require('bcrypt')

const { SECRET_KEY_JWT, SALT_ROUNDS } = process.env


const models = require('../database/models/');

signUpRouter.get('/', (req, res, next) => {
    res.send('Esta es la ruta de sign up')
})
  
signUpRouter.post('/', async (req, res, next) => {
    const newUserData = req.body
    const saltRounds = Number(SALT_ROUNDS)
    try {
        const checkedUser = await models.User.findOne({where: {
            email: newUserData.email
            }
        })
        if(checkedUser) {
            return res.send({message: 'This email is already taken'})
        }

        const hashedPassword = bcrypt.hashSync(newUserData.password, saltRounds);

        const newUser = await models.User.create({
            ...newUserData,
            password: hashedPassword,
            role: "staff",
            createdAt: new Date(),
            updatedAt: new Date() 
        })

        const jasonWebToken = jwt.sign({id: newUser.id, email: newUser.email}, SECRET_KEY_JWT)

        response.success(req, res, {message: `User was successfully created`, token: jasonWebToken})

    } catch (error) {
        response.error(req, res, error)
    }
})


module.exports = signUpRouter