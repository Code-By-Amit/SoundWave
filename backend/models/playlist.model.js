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
    savedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ],
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