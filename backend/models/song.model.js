const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Song Name Required"]
    },
    artist:{
        type:mongoose.Schema.ObjectId,
        ref:"Artist",
        default:null
    },
    songUrl:{
        type:String,
        required:[true,"Song Url is Required"]
    },
    image:{
        type:String,
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }
    ]
},{
    timestamps: true, 
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;