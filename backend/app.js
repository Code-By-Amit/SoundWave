const express = require('express')
const cookieParser = require('cookie-parser')
const connectToDB = require('./connectToDB.js')

const authRoute = require('./routes/auth.routes.js')


const app = express()
require("dotenv/config")

const PORT = process.env.PORT || 4000;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 
app.use(cookieParser())

app.use('/auth',authRoute)

app.get("/", (req, res) => {
    res.send("Server is Running")
})

app.listen(PORT, (err) => {
    if (err) throw err
    connectToDB()
    console.log(`The Server is Running on http://localhost:${PORT}`)
})