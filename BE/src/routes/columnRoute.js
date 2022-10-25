const router = require('express').Router()
const columnController = require('../controllers/columnController')


router.route('/create')
    // .get((req, res) => console.log('GET board'))
    .post(columnController.createNew)

router.route('/update/:id')
    // .get((req, res) => console.log('GET board'))
    .patch(columnController.updateData)
    
module.exports = router