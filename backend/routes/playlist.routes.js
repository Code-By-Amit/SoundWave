const { createPlaylist, deletePlaylist, updatePlaylist, getPlaylist, toggleSongInPlaylist, togglePlaylistSave ,getUserPlaylist,getPlaylisById} = require("../controllers/playlist.controller")
const { isAuthenticated } = require("../middlewares/auth")
const upload  = require("../middlewares/multer")

const router = require("express").Router()

router.get("/", getPlaylist)
router.get("/user-playlists",isAuthenticated, getUserPlaylist)
router.post("/create", isAuthenticated,upload.single('image'), createPlaylist)
router.get("/:playlistId",getPlaylisById)
router.delete("/:playlistId", isAuthenticated, deletePlaylist)
router.patch("/:playlistId", isAuthenticated, updatePlaylist)
router.patch("/:playlistId/toggle-song-save", isAuthenticated, toggleSongInPlaylist)
router.patch("/:playlistId/toggle-save", isAuthenticated, togglePlaylistSave)
module.exports = router