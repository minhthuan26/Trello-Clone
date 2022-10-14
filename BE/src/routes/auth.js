const router = require('express').Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', authController.Register)
router.post('/login', authController.Login)
router.post('/refresh', authController.Refresh)
router.post('/logout', authMiddleware.verify,authController.Logout)

module.exports = router