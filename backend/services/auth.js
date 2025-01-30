const jwt = require('jsonwebtoken')
const { eventNames } = require('../models/user.model')

const generateToken = async (payload) =>{
    return jwt.sign(payload,process.env.JWT_SECRET)
} 

const verifyToken = async = (token) =>{
    return jwt.verify(token,process.env.JWT_SECRET)
}
module.exports ={
    generateToken,
    verifyToken
}