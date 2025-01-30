const USER = require("../models/user.model")
const { verifyToken } = require("../services/auth")

async function isAuthenticated(req,res,next){
    try {
        const token = req.cookes?.token
        if(!token) return res.status(400).json({message:"Token not Found. Unauthorized"})
        
        const decoded = await verifyToken(token)
        req.userId = decoded.userId;
        next()
    } catch (error) {
        console.log('Error in authentication Middleware: ', error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports = {
    isAuthenticated
}