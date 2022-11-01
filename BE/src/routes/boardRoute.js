const router = require('express').Router()
const boardController = require('../controllers/boardController')
const BoardService = require('../services/boardService')


router.route('/create')
    // .get((req, res) => console.log('GET board'))
    .post(boardController.createNew)

router.route('/:id')
    .get(boardController.getFullBoard)
    
module.exports = router