const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
require("dotenv/config")

const PORT = process.env.PORT || 4000;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server is Running")
})

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`The Server is Running on http://localhost:${PORT}`)
})