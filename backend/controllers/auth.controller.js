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

        if (!(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials ⚠️" })
        }

        const payload = {
            userId: user._id
        }

        const token = await generateToken(payload)

        res.cookie('token', token, {
            httpOnly: true,
            maxage: 7 * 24 * 60 * 70 * 1000
        })
        let { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ user: userWithoutPassword, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


const handleSignup = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullName, username, password } = req.body;
        let user = await USER.findOne({ username })
        if (user) {
            return res.status(400).json({ message: "Username already exists" })
        }

        user = await USER.create({
            fullName,
            username,
            password
        })

        const payload = {
            userId: user._id,
        }

        const token = await generateToken(payload);

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

module.exports = {
    handleLogin,
    handleSignup
}