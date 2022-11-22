const router = require('express').Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const passport = require('passport')
require('../middlewares/passportMiddleware')

router.post('/register', authController.Register)
router.post('/login', authController.Login)
router.get('/login-google', passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent' }))
// router.post('/login-google', passport.authenticate('google-plus-token', authController.LoginWithGoogle))
router.get('/login-google/callback', passport.authenticate('google', { failureRedirect: '/login-google' }), authController.LoginWithGoogle);
router.post('/refresh', authController.RefreshToken)
router.post('/logout', authMiddleware.verify, authController.Logout)
router.post('/reset-password', authController.ResetPassword)
router.get('/verify/:token', authMiddleware.verifyActiveEmail, authController.VerifyActiveEmail)
router.get('/reset-password/:token', authMiddleware.verifyResetPasswordEmail, authController.VerifyResetPasswordEmail)
router.get('/resend-email-confirm', authController.ResendConfirmEmail)

module.exports = router