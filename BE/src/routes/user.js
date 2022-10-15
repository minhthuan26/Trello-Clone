const router = require('express').Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware.verify,userController.GetAllUsers)

module.exports = router