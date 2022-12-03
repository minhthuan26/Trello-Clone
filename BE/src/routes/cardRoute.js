const router = require('express').Router()
const cardController = require('../controllers/cardController')


router.route('/create')
    // .get((req, res) => console.log('GET board'))
    .post(cardController.createNew)

router.route('/change-status/:id')
    .patch(cardController.changeStatus)
    
router.route('/delete/:id')
    .delete(cardController.delete)
module.exports = router