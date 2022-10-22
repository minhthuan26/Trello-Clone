const router = require('express').Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const passport = require('passport')
require('../middlewares/passportMiddleware')

router.post('/register', authController.Register)
router.post('/login', authController.Login)
router.get('/login-google', passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent'}))
// router.post('/login-google', passport.authenticate('google-plus-token', authController.LoginWithGoogle))
router.get('/login-google/callback',passport.authenticate('google', { failureRedirect: '/login-google' }), authController.LoginWithGoogle);
router.post('/refresh', authController.Refresh)
router.post('/logout', authMiddleware.verify,authController.Logout)

module.exports = router