const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    profileImg: {
        type: String,
        default: "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg"
    },
    username: {
        type: String,
        require: [true, "User name Required"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    songsLiked: [{
        type: mongoose.Schema.ObjectId,
        ref: "Song"
    }]
    ,
    playlist: [{
        type: mongoose.Schema.ObjectId,
        ref: "Playlist"
    }],
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    songsUploaded: [{
        type: mongoose.Schema.ObjectId,
        ref: "Song"
    }],
    recentPlays: [{
        type: mongoose.Schema.ObjectId,
        ref: "Song"
    }]
}, {
    timestamps: true,
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next();
})


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const USER = mongoose.model('User', userSchema)
module.exports = USER