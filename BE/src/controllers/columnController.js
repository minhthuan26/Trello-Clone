const column = require('../models/ColumnModel')
const board = require('../models/BoardModel')

class ColumnController {
     createNew = async (req, res) =>{
        try {
            const newColumn = await column.create(req.body)
            const updatedBoard = await board.findOneAndUpdate(
                {
                    _id: newColumn.boardId
                },
                {
                    $push: {columnOrder: newColumn._id}
                },
                {
                    returnOriginal: false
                }
            )

            // const updatedBoard = await board.pushColumnOrder(boardId, newColumnId)
            // console.log(newColumn.date.toString())
            res.status(200).json(newColumn)
        } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }

    updateData = async(req, res)=>{
        try {
            const {id} = req.params.id
            const data = req.body
            const find = await column.findOne({id})
            if(find){
                const result = await column.findOneAndUpdate(
                    { 
                        id
                    }
                ,
                data
                ,{
                    new: true, //return ve document update thay vi document original
                    // upsert: true // neu khong co thi insert
                    newValidate:true,
                })
                return res.status(200).json(result)
            }else{
                return res.status(404).json({
                    msg: `Column with id: ${id} not exist`
                })
            }

            console.log(result)
           

        } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }

    // delete = async(req, res)=>{
    //     try {
    //         const {id} = req.params.id
    //         const find = await column.findOne({id})
    //         if(find){
    //             const result = await column.findOneAndUpdate(
    //                 {
    //                     id
    //                 }
    //             ,
    //             {
    //                 _destroy: true
    //             }
    //             ,{
    //                 new: true, //return ve document update thay vi document original
    //                 newValidate:true,
    //             })
    //             return res.status(200).json(result)
    //         }else{
    //             return res.status(404).json({
    //                 msg: `Column with id: ${id} not exist`
    //             })
    //         }           

    //     } catch (error) {
    //         res.status(500).json({
    //             errors: error.message
    //         })
    //     }
    // }

    delete = async(req, res)=>{
        try {
            const find = await column.findOne({_id:req.params.id})
            if(find){
                 await column.deleteOne({
                    _id: req.params.id
                })
                // await board.findOneAndUpdate(
                //     {
                //         _id: find.boardId
                //     },
                //     {
                //         delete: {columnOrder: req.params.id}
                //     },
                //     {
                //         returnOriginal: false
                //     }
                // )
                return res.status(200).json({
                    msg: `Delete column with title: ${find.title} successful`
                })
            }else{
                return res.status(404).json({
                    msg: `Column with id: ${id} not exist`
                })
            }           

        } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }
}



module.exports = new ColumnController