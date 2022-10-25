const router = require('express').Router()
const boardController = require('../controllers/boardController')


router.route('/create')
    // .get((req, res) => console.log('GET board'))
    .post(boardController.createNew)


    
module.exports = router