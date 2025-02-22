const mongoose = require('mongoose')

async function connectToDB() {
    mongoose.connect("mongodb://localhost:27017/SoundWave").then(()=>{
        console.log("Connected to mongoDb Successfully");
    }).catch((err)=>{
        console.log(`Failed to connect to mongoDb!! , Error :${err}`)
        process.exit(1)
    })
}

module.exports = connectToDB