const { getSongs,likeSong ,createSong, deleteSong} = require("../controllers/songs.controller")
const { isAuthenticated } = require("../middlewares/auth")

const router = require("express").Router()

router.delete("/:id",isAuthenticated,deleteSong)
router.get("/",getSongs)
router.post("/like/:id",isAuthenticated,likeSong)
router.post("/",isAuthenticated,createSong)
module.exports = router