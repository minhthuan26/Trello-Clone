const board = require('../models/BoardModel')

const mongoose = require('mongoose')
class BoardController {
     createNew = async (req, res) =>{
        try {
                const userId = req.user.id
                const result = await board.create({title: req.body.title,createBy:mongoose.Types.ObjectId(userId)})
                console.log(result)
                res.status(200).json(result)

        } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }

    getFullBoards = async (req, res) =>{
        try {
                const userId = req.user.id
                const boards = await board.find({createBy:userId})
                // res.status(200).json(result)
                const result = boards.map(board => {
                    let id = board._id.toString()
                    let title = board.title
                    return {id, title}
                })
                return res.status(200).json(result)
            } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }

    getBoardDetail = async (req, res) =>{
        try {
                const boardId = req.params.id
                const result = await board.aggregate([
                    {
                        $match:{
                            _id: mongoose.Types.ObjectId(boardId) 
                        }
                    },
                    {
                        $lookup: {
                            from: 'columns',  //colection name 
                            localField: '_id',
                            foreignField: 'boardId',
                            as: 'columns'
                        }
                    },
                    {
                        $lookup: {
                            from: 'cards',
                            localField: '_id',
                            foreignField: 'boardId',
                            as: 'cards'
                        }
                    }
                ])
                // console.log(result[0].cards)
    
                result[0].columns.forEach(column => {
                    // console.log(result[0].cards.filter(c=> c.columnId===column._id))
                    column.cards = result[0].cards.filter(c=> c.columnId.toString() == column._id.toString())
                });
    
                delete result[0].cards
                res.status(200).json(result)
    
                return result[0] || {}
            
        } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }


    
}



module.exports = new BoardController