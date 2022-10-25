const router = require('express').Router()
const cardController = require('../controllers/cardController')


router.route('/create')
    // .get((req, res) => console.log('GET board'))
    .post(cardController.createNew)

    
module.exports = router