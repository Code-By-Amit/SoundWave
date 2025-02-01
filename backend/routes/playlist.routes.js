const { createPlaylist, deletePlaylist, updatePlaylist, getPlaylist, toggleSongInPlaylist, togglePlaylistSave } = require("../controllers/playlist.controller")
const { isAuthenticated } = require("../middlewares/auth")

const router = require("express").Router()

router.get("/", getPlaylist)
router.post("/", isAuthenticated, createPlaylist)
router.delete("/:playlistId", isAuthenticated, deletePlaylist)
router.patch("/:playlistId", isAuthenticated, updatePlaylist)
router.patch("/:playlistId/toggle-song-save", isAuthenticated, toggleSongInPlaylist)
router.patch("/:playlistId/toggle-save", isAuthenticated, togglePlaylistSave)
module.exports = router