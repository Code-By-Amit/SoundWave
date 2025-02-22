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
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA8vl-PcTa5Euv40E7cHNeNfc8XYTJ7lDA5KLB7NCJ1w-QIyS0Jx7Fb7l0qDcd1R2wx2I&usqp=CAU"
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