const { findByIdAndDelete } = require("../models/artist.model");
const Playlist = require("../models/playlist.model");
const USER = require("../models/user.model");
const { trace } = require("../routes/playlist.routes");


async function getPlaylist(req, res, next) {
    try {
        const { search, limit = 10, page = 1, all, top } = req.query
        const query = search ? { title: RegExp(search, 'i') } : {};

        if (all == "true") {
            const playlists = await Playlist.find({ isPrivate: false }).populate('songs')
            return res.status(200).json({ message: "All Playlist", playlists })
        }
        if (top == 'true') {
            const playlists = await Playlist.find({isPrivate: false}).sort({ createdAt: -1 }).limit(Number(limit))
            return res.status(200).json({ message: "Top Playlist", playlists })
        }
        const playlists = await Playlist.find({ ...query, isPrivate: false }).skip((page - 1) * limit).limit(Number(limit))

        if(!playlists){
            return res.status(404).json({ message: "Playlist Not Found" })
        }

        res.status(200).json({ message: `Page ${page} playlist`, playlists })
    } catch (error) {
        console.error("Error in Get Playlist handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

async function getPlaylisById(req,res,next) {
    try{
        const id = req.params.playlistId;
        console.log("id is :",id)
        const playlist = await Playlist.findById(id).populate('songs');
        if(!playlist){
            return res.status(404).json({ message: "Playlist Not Found" })
        }
        res.status(200).json({message:`Playlist by id ${id}`,playlist})

    }catch(error){
        console.error("Error in Get Playlist By Id handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

async function getUserPlaylist(req, res, next) {
    try {
        const { saved, yours } = req.query;
        let userCreatedPlaylist = [];
        let userSavedPlaylist = [];

        // Ensure user exists
        const user = await USER.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (saved == 'true') {
            const populatedPlaylist = await user.populate('playlist').then(u => u.playlist)
            userSavedPlaylist = populatedPlaylist.filter(playlist => String(playlist.author) !== String(req.userId))
        }

        if (yours == 'true') {
            userCreatedPlaylist = (await Playlist.find({ author: req.userId }))
        }

        res.status(200).json({ message: "User Playlists", userCreatedPlaylist, userSavedPlaylist })
    } catch (error) {
        console.error("Error in Get User Playlist handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

async function createPlaylist(req, res, next) {
    try {
        const userId = req.userId;
        const { name, image, isPrivate } = req.body;

        // Ensure user exists
        const user = await USER.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const playlist = await Playlist.create({
            author: userId,
            name,
            image,
            isPrivate
        })

        user.playlist.push(playlist._id)
        await user.save()

        res.status(201).json({ message: "Playlist Created Sucessfully", playlist })
    } catch (error) {
        console.error("Error in Create Playlist handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


async function deletePlaylist(req, res, next) {
    try {
        const userId = req.userId;
        const playlistId = req.params.playlistId;
        // Ensure user exists
        const user = await USER.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const playlist = await Playlist.findByIdAndDelete(playlistId)
        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" })
        }

        let playlistIndex = user.playlist.findIndex(p_Id=>p_Id.toString()===playlistId)
        user.playlist.splice(playlistIndex, 1);
        await user.save()

        res.status(200).json({ message: "Playlist Deleted Sucessfully!", playlist })
    } catch (error) {
        console.error("Error in Delete Playlist handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

async function updatePlaylist(req, res, next) {
    try {
        const playlistId = req.params.playlistId;
        const { name, image, isPrivate } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (image) updateData.image = image;
        if (typeof isPrivate === "boolean") updateData.isPrivate = isPrivate; // Ensuring boolean type

        const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, { $set: updateData }, { new: true });

        if (!updatedPlaylist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        res.status(200).json({ message: "Playlist Updated Successfully", playlist: updatedPlaylist });
    } catch (error) {
        console.error("Error in Update Playlist handler:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

async function toggleSongInPlaylist(req, res, next) {
    try {
        const { playlistId } = req.params;
        const { songId } = req.body;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: "Playlist Not Found" });
        }

        const songIndex = playlist.songs.findIndex((s_id) => s_id.toString() === songId.toString());

        if (songIndex !== -1) {
            // Remove song if already present
            playlist.songs.splice(songIndex, 1);
            await playlist.save();
            return res.status(200).json({ message: "Song Removed from Playlist", playlist });
        }

        // Add song if not present
        playlist.songs.push(songId);
        await playlist.save();
        res.status(200).json({ message: "Song Added to Playlist", playlist });

    } catch (error) {
        console.error("Error in Toggle Song handler:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

async function togglePlaylistSave(req, res, next) {
    try {
        const { playlistId } = req.params;
        const userId = req.userId;

        const playlist = await Playlist.findById(playlistId);
        const user = await USER.findById(userId);

        if (!playlist) return res.status(404).json({ message: "Playlist Not Found" });

        const userIdIndexInPlaylist = playlist.savedBy.findIndex((u_id) => u_id.toString() == userId.toString())
        const playlistIdIndexInUser = user.playlist.findIndex((p_id) => p_id.toString() == playlistId.toString())

        if (userIdIndexInPlaylist !== -1) {
            //if User Already Present in Playlist
            user.playlist.splice(playlistIdIndexInUser, 1);
            playlist.savedBy.splice(userIdIndexInPlaylist, 1);

            await user.save();
            await playlist.save();
            return res.status(200).json({ message: "User Unsaved Playlist", playlist })
        }

        playlist.savedBy.push(userId);
        user.playlist.push(playlistId);
        await playlist.save();
        await user.save();
        return res.status(200).json({ message: "User Saved Playlist", playlist })

    } catch (error) {
        console.error("Error in Toggle Song handler:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    createPlaylist,
    deletePlaylist,
    updatePlaylist,
    getPlaylist,
    toggleSongInPlaylist,
    togglePlaylistSave,
    getUserPlaylist,
    getPlaylisById
}