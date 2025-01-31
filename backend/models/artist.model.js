const mongoose = require("mongoose")

const artistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide Artist name"]
    },
    bio: {
        type: String,
        trim: true, // Short biography of the artist/band
    },
    songs:[ 
        {
            type:mongoose.Schema.ObjectId,
            ref:"Song"
        }
    ],
    image: {
        type: String, // URL to artist image
    }
},{
    timestamps: true, 
})

const Artist = mongoose.model("Artist",artistSchema);
module.exports = Artist