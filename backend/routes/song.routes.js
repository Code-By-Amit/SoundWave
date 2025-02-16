const { getSongs,likeSong ,uploadSong, deleteSong, addSongToRecentPlays,getRecentPlays, getFavourates,getUserUploads} = require("../controllers/songs.controller")
const { isAuthenticated } = require("../middlewares/auth")
const upload = require("../middlewares/multer")

const router = require("express").Router()

router.delete("/delete/:id",isAuthenticated,deleteSong)
router.get("/",getSongs)
router.post("/like/:id",isAuthenticated,likeSong)
router.post("/",isAuthenticated,
    upload.fields([
        { name: 'song', maxCount: 1 },
        { name: 'image', maxCount: 1 }
    ]),uploadSong)
router.post('/recent/:id',isAuthenticated,addSongToRecentPlays)
router.get('/recent',isAuthenticated,getRecentPlays)
router.get('/favourates',isAuthenticated,getFavourates)
router.get('/useruploads',isAuthenticated,getUserUploads)
module.exports = router 