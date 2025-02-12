const USER = require('../models/user.model')
const { validationResult } = require('express-validator');
const { generateToken } = require('../services/auth');
const bcrypt = require('bcrypt')

const handleLogin = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body
    try {
        const user = await USER.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: "No user found" })
        }

        // if (!(await user.comparePassword(password))) {
        //     return res.status(401).json({ message: "Invalid credentials ⚠️" })
        // }

        const payload = {
            userId: user._id,
            role: user.role
        }

        const token = generateToken(payload)
        console.log("token Generated",token)
        res.cookie('token', token, {
            httpOnly: true,
            maxage: 7 * 24 * 60 * 70 * 1000
        })
        let { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ user: userWithoutPassword, token })

    } catch (error) {
        console.log("Error in login up handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


const handleSignup = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { firstName,lastName, username, password } = req.body;
        let user = await USER.findOne({ username })
        if (user) {
            return res.status(409).json({ message: "Username already exists" })
        }

        user = await USER.create({
            firstName,
            lastName,
            username,
            password
        })

        const payload = {
            userId: user._id,
            role: user.role
        }

        const token = generateToken(payload);

        res.cookie('token', token, {
            httpOnly: true,
            maxage: 7 * 24 * 60 * 60 * 1000,       // 7 Days                  
        })

        let { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ user: userWithoutPassword, token })
    } catch (error) {
        console.log("Error in sign up handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

async function logoutUser(req, res, next) {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "User Log-Out Sucessfully" })
    } catch (error) {
        console.log("Error in Logout handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

async function getAuthUser(req, res, next) {
    try {
        const user = await USER.findById(req.userId).select('-password')
        res.status(200).json({ message: "Authenticated user", user })
    } catch (error) {
        console.log("Error in Logout handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
module.exports = {
    handleLogin,
    handleSignup,
    logoutUser,
    getAuthUser
}