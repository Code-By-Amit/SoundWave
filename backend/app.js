const express = require('express')
const cookieParser = require('cookie-parser')
const connectToDB = require('./config/connectToDB.js')

const authRoute = require('./routes/auth.routes.js')
const aritstRoute = require("./routes/artist.routes.js")
const songRoute = require("./routes/song.routes.js")

const app = express()
require("dotenv/config")

const PORT = process.env.PORT || 4000;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 
app.use(cookieParser())

app.use('/auth',authRoute)
app.use("/artist",aritstRoute)
app.use("/songs",songRoute)

app.get("/", (req, res) => {
    res.send("Server is Running")
})

const server = app.listen(PORT, (err) => {
    if (err) throw err
    connectToDB()
    console.log(`The Server is Running on http://localhost:${PORT}`)
})

// Handle graceful shutdown on SIGINT (Ctrl+C) or SIGTERM (termination signal)
process.on('SIGINT', () => {
    console.log('Gracefully shutting down the server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('Gracefully shutting down due to termination...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});