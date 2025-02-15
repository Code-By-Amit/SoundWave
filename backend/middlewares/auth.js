const USER = require("../models/user.model")
const { verifyToken } = require("../services/auth")

function isAuthenticated(req,res,next){
    try {
        const token = req.headers?.authorization?.split(' ')[1] || req.cookies?.token;
    
        if(!token) return res.status(400).json({message:"Token not Found. Unauthorized"})
        
        const decoded = verifyToken(token)
       
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next()
    } catch (error) {
        console.log('Error in authentication Middleware: ', error)
        res.status(500).json({message:"Internal Server Error"})
    }
} 


function restrictedTo(roles= []){
    return function (req,res,next){
        if (!req.userId || !roles.includes(req.userRole)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    }
} 
module.exports = {
    isAuthenticated,
    restrictedTo
}