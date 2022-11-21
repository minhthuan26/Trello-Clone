const router = require('express').Router()
const boardController = require('../controllers/boardController')
const authMiddleware = require('../middlewares/authMiddleware')


router.route('/create')
    // .get((req, res) => console.log('GET board'))
    .post(authMiddleware.verify, boardController.createNew)


router.route('/:id')
    .get(authMiddleware.verify,boardController.getBoardDetail)
    
router.route('/test/test')
    .get(authMiddleware.verify, boardController.getFullBoards)


module.exports = router