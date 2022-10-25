const card = require('../models/cardModel')
class CardController {
     createNew = async (req, res) =>{
        try {
            const result = await card.create(req.body)
            console.log(result)
            res.status(200).json(result)
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