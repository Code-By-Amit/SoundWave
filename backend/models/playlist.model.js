const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Playlist name Required"]
    },
    songs: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Song"
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;