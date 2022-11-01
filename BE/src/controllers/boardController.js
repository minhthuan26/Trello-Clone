const board = require('../models/BoardModel')
class BoardController {
     createNew = async (req, res) =>{
        try {
            const result = await board.create(req.body)
            console.log(result)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }



    
}



module.exports = new BoardController