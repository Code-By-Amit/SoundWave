
const Artist = require("../models/artist.model");
const Songs = require("../models/song.model");
const USER = require("../models/user.model");

async function getSongs(req, res, next) {
    try {
        const { search, limit = 10, page = 1, all, top, some } = req.query
        const query = search ? { title: RegExp(search, 'i') } : {};

        if (all == "true") {
            const songs = await Songs.find({})
            return res.status(200).json({ message: "All Songs", songs })
        }
        if (top == 'true') {
            const songs = await Songs.find().sort({ noOfPlays: -1 }).limit(Number(limit))
            return res.status(200).json({ message: "Top Songs", songs })
        }
        if (some == 'true') {
            const songs = await Songs.aggregate([{ $sample: { size: limit } }])
            return res.status(200).json({ message: "some Songs", songs })
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
        if (!song) {
            return res.status(404).json({ message: `Song Not Found With id ${id}` })
        }

        if (song.likes.includes(userId)) {
            song.likes = song.likes.filter((u_id) => u_id.toString() !== userId.toString());
            user.songsLiked = user.songsLiked.filter((s_id) => s_id.toString() !== id.toString());

            await song.save()
            await user.save()
            return res.status(200).json({ message: "Unliked Song Sucessfully" })
        } else {
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


async function uploadSong(req, res, next) {
    try {
        const { title, artist, songUrl, image } = req.body;
        const userId = req.userId;

        const user = await USER.findById(userId);

        if (!title || !songUrl) {
            return res.status(400).json({ message: "All fields are Necessary" })
        }

        const newSong = await Songs.create({
            title,
            artist,
            songUrl,
            image
        });

        user.songsUploaded.push(newSong._id);
        await user.save();

        if (artist) {
            const artistSongs = await Artist.findById(artist).select('songs');
            artistSongs.songs.push(newSong._id);
            await artistSongs.save();
        }

        res.status(201).json({ message: "Song Upload Sucessfully", song: newSong })

    } catch (error) {
        console.error("Error in Upload Songs handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


async function deleteSong(req, res, next) {
    try {
        const songId = req.params.id;
        const userId = req.userId;

        const song = await Songs.findByIdAndDelete(songId);
        if (!song) {
            return res.status(404).json({ message: "Song Not Found" })
        }
        const user = await USER.findById(userId)
        const songIndexinUser = user.songsUploaded.findIndex((s_id) => s_id.toString() == songId.toString())

        // Remove Song in User Also
        if (songIndexinUser !== -1) {
            user.songsUploaded.splice(songIndexinUser, 1);
            await user.save();
        }
        if (song.artist) {
            const artist = await Artist.findById(song.artist)
            songIndexInArtist = artist.songs.findIndex((s_id) => s_id.toString() === songId.toString())
            artist.songs.splice(songIndexInArtist, 1)
            await artist.save();
        }

        // Remove song _id from all users who liked it
        await USER.updateMany(
            { songsLiked: songId },
            { $pull: { songsLiked: songId } }  // Removes the song id from likedSongs array
        );


        res.status(200).json({ message: "Song Deleted Sucessfully" })
    } catch (error) {
        console.error("Error in Delete Songs handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

async function addSongToRecentPlays(req, res, next) {
    try {
        const songId = req.params.id;
        const userId = req.userId;

        const user = await USER.findById(userId).select('-password')

        const existingSong = user.recentPlays.findIndex(sId => sId.toString() === songId.toString())
        if (existingSong !== -1) {
            user.recentPlays.splice(existingSong, 1);
        }

        user.recentPlays.unshift(songId)

        if (user.recentPlays.length > 10) {
            user.recentPlays.pop();
        }

        await user.save();
        res.status(200).json({ message: "Song Added To Recent Plays" })
    } catch (error) {
        console.error("Error in Add Sont To Recent handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

async function getRecentPlays(req, res, next) {
    try {
        const userId = req.userId;
        const user = await USER.findById(userId).populate('recentPlays').select('-password');
        console.log(user)
        if (!user) {
            return res.status(200).json({ message: "User Not Found" })
        }
        res.status(200).json({ message: "Recent Plays Song", recentSong: user.recentPlays })
    } catch (error) {
        console.error("Error in Get Recent Plays handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

module.exports = {
    getSongs,
    likeSong,
    uploadSong,
    deleteSong,
    addSongToRecentPlays,
    getRecentPlays
}