const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Song Name Required"]
    },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: "Artist",
        default: null
    },
    songUrl: {
        type: String,
        required: [true, "Song Url is Required"]
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dqelb5apq/image/upload/v1740229987/default_ei8j1n.png"
    },
    noOfPlays: {
        type: Number,
        default: 0
    }
    ,
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true,
})

const Songs = mongoose.model('Song', songSchema);

module.exports = Songs;