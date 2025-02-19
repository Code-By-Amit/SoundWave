const router = require('express').Router()
const { body } = require('express-validator')
const { handleLogin, handleSignup, logoutUser,getAuthUser ,updateUserProfile} = require('../controllers/auth.controller')
const { isAuthenticated } = require('../middlewares/auth')
const upload = require('../middlewares/multer')


router.get('/me',isAuthenticated,getAuthUser)
router.post('/login',
    body('username').trim().notEmpty().withMessage("User name Required").isLength({min:3}).withMessage("User must be At least 3 character long").matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain alphanumeric characters and underscores'),
    body('password').trim().notEmpty().withMessage("Password Required").isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
, handleLogin)


router.post('/signup',
    body('username').trim().notEmpty().withMessage("User name Required").isLength({min:3}).withMessage("User must be At least 3 character long").matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain alphanumeric characters and underscores'),
    body('password').trim().notEmpty().withMessage("Password Required").isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
, handleSignup)

router.patch('/update',isAuthenticated,upload.single('profileImg'),updateUserProfile)

router.post("/logout",logoutUser)
module.exports = router