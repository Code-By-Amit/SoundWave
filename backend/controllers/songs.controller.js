
const Songs = require("../models/song.model");
const USER = require("../models/user.model");

async function getSongs(req, res, next) {
    try {
        const { search, limit = 10, page = 1, all } = req.query
        const query = search ? { title: RegExp(search, 'i') } : {};

        if (all == "true") {
            const songs = await Songs.find({})
            return res.status(200).json({ message: "All Songs", songs })
        }
        const songs = await Songs.find(query).skip((page - 1) * limit).limit(Number(limit))

        if (!songs) {
            return res.status(404).json({ message: "Failed to Get songs" })
        }

        res.status(200).json({ message: `Page ${page} Songs`, songs })
    } catch (error) {
        console.error("Error in get Songs handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


async function likeSong(req, res, next) {
    try {
        const id = req.params.id;
        const userId = req.userId;

        const song = await Songs.findById(id);
        const user = await USER.findById(userId);
        if(!song){
            return res.status(404).json({message:`Song Not Found With id ${id}`})
        }

        if(song.likes.includes(userId)){
            song.likes = song.likes.filter((u_id) => u_id.toString() !== userId.toString());
            user.songsLiked = user.songsLiked.filter((s_id) => s_id.toString() !== id.toString());

            await song.save()
            await user.save()
            return res.status(200).json({message:"Unliked Song Sucessfully"})
        }else{
            song.likes.push(userId);
            user.songsLiked.push(song._id);
        }

        await song.save()
        await user.save()

        res.status(200).json({ message: "Liked Song Sucessfully" })

    } catch (error) {
        console.error("Error in Like Songs handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


async function createSong(req, res, next) {
    try {
        const { title, artist, songUrl, image } = req.body;

        if (!title || !songUrl) {
            return res.status(400).json({ message: "All fields are Necessary" })
        }

        const newSong = await Songs.create({
            title,
            artist,
            songUrl,
            image
        });

        res.status(201).json({ message: "Song Created Sucessfully", song: newSong })

    } catch (error) {
        console.error("Error in Create Songs handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


async function deleteSong(req, res, next) {
    try {
        const id = req.params.id;

        const song = await Songs.findByIdAndDelete(id);
        if (!song) {
            return res.status(404).json({ message: "Song Not Found" })
        }

        // Remove song _id from all users who liked it
        await USER.updateMany(
           { songsLiked: id }, 
           { $pull: { songsLiked: id } }  // Removes the song id from likedSongs array
       );

        res.status(200).json({ message: "Song Deleted Sucessfully" })
    } catch (error) {
        console.error("Error in Delete Songs handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

module.exports = {
    getSongs,
    likeSong,
    createSong,
    deleteSong
}