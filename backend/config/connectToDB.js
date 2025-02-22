const mongoose = require('mongoose')

async function connectToDB() {
    mongoose.connect(process.env.MongoDB_URL).then(()=>{
        console.log("Connected to mongoDb Successfully");
    }).catch((err)=>{
        console.log(`Failed to connect to mongoDb!! , Error :${err}`)
        process.exit(1)
    })
}

module.exports = connectToDB