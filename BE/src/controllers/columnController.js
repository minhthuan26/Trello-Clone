const column = require('../models/ColumnModel')
class ColumnController {
     createNew = async (req, res) =>{
        try {
            const result = await column.create(req.body)
            console.log(result)
            res.status(200).json(result)
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

    
}



module.exports = new ColumnController