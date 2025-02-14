const { getSongs,likeSong ,uploadSong, deleteSong, addSongToRecentPlays,getRecentPlays, getFavourates} = require("../controllers/songs.controller")
const { isAuthenticated } = require("../middlewares/auth")

const router = require("express").Router()

router.delete("/:id",isAuthenticated,deleteSong)
router.get("/",getSongs)
router.post("/like/:id",isAuthenticated,likeSong)
router.post("/",isAuthenticated,uploadSong)
router.post('/recent/:id',isAuthenticated,addSongToRecentPlays)
router.get('/recent',isAuthenticated,getRecentPlays)
router.get('/favourates',isAuthenticated,getFavourates)
module.exports = router