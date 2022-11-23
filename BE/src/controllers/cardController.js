const { findOne } = require('../models/cardModel')
const card = require('../models/cardModel')
const column = require('../models/ColumnModel')

class CardController {
     createNew = async (req, res) =>{
        try {
            // const dateOfColumn = await column.findOne({_id:req.body.columnId})
            // const newCard = await card.create(req.body)
            const newCard = await card.create(req.body)
            await column.findOneAndUpdate(
                {
                    _id: newCard.columnId
                },
                {
                    $push: {cardOrder: newCard._id}
                },
                {
                    returnOriginal: false  
                }
            ) 

            res.status(200).json(newCard)
            console.log(dateOfColumn.date.getDate())
        } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }   

    changeStatus = async (req, res) =>{

        try {
            const updateCard = await card.findOne({_id: req.params.id})
            if(updateCard){
                await card.findOneAndUpdate(
                    {_id: req.params.id},
                    {
                        status : !updateCard.status
                },
                {
                    new: true,
                    newValidate:true,
                })
                return res.status(200).json({ msg: 'change Status success' })
            }
            else{
                res.status(404).json({msg:'This card is not existed'})
            }
            // console.log(find)
        } catch (error) {
            res.status(500).json({
                errors: error.message
            })
        }
    }

    // updateData = async(req, res)=>{
    //     try {
    //         const {id} = req.params.id
    //         const data = req.body
    //         const find = await card.findOne({id})
    //         if(find){
    //             const result = await card.findOneAndUpdate(
    //                 {
    //                     id
    //                 }
    //             ,
    //             data
    //             ,{
    //                 new: true, //return ve document update thay vi document original
    //                 // upsert: true // neu khong co thi insert
    //                 newValidate:true,
    //             })
    //             return res.status(200).json(result)
    //         }else{
    //             return res.status(404).json({
    //                 msg: `Card with id: ${id} not exist`
    //             })
    //         }

    //         console.log(result)
           

    //     } catch (error) {
    //         res.status(500).json({
    //             errors: error.message
    //         })
    //     }
    // }
    
}



module.exports = new CardController