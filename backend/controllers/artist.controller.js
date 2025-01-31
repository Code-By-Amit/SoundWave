const { validationResult } = require("express-validator");
const Artist = require("../models/artist.model");

 const createArtist = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, bio, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({ message: "Please Provide name and image" });
        }
        const artist = await Artist.create({
            name, 
            bio,
            image

        })
        res.status(201).json({ artist });
    } catch (error) {
        console.log("Error in create Artist handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


const getAllArtist =  async (req,res,next) => {
    try {
        const artist = await Artist.find({});
        if (!artist) {
            return res.status(404).json({ message: "Artist not Found" })
        }

        res.status(200).json({ artist })
    } catch (error) {
        console.log("Error in getAllArtist handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const getArtistById = async (req, res, next) => {
    try {
        const id = req.params.id

        const artist = await Artist.findById(id)
        if (!artist) {
            return res.status(404).json({ message: "Artist not Found" })
        }

        res.status(200).json({ artist })
    } catch (error) {
        console.log("Error in getArtistById handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const deleteArtistById = async (req, res, next) => {
    try {
        const id = req.params.id
        console.log(id)
        const artist = await Artist.findByIdAndDelete(id);
        if (!artist) {
            return res.status(404).json({ message: "Artist not Found" })
        }

        res.status(200).json({ artist })
    } catch (error) {
        console.log("Error in deleteArtistById handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const updateArtistInfo = async (req, res, next) => {
    try {
        const id = req.params.id
        const {name,bio,image} = req.body;
        const artist = await Artist.findById(id);
        if (!artist) {
            return res.status(404).json({ message: "Artist not Found" })
        }
 
        const updateData = {};

        if (name) updateData.name = name;
        if (bio) updateData.bio = bio;
        if(image) updateData.image = image;

        const updatedArtist = await Artist.findByIdAndUpdate(id, { $set: updateData }, { new: true }).select('-password');
 
        res.status(200).json({ updatedArtist })
    } catch (error) {
        console.log("Error in updateArtistInfo handeler : ", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

module.exports = {
    createArtist,
    getAllArtist,
    getArtistById,
    updateArtistInfo,
    deleteArtistById
}