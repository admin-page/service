const {createToken, verifyToken} = require('../../helpers');
const {House} = require('../../models')

module.exports = {
    getHouse: async (req,res) =>{
        try{
            const result = await House.find()
            res.send({message:'get all data', data:result})
        }
        catch(error){
            res.send(error)
        }
       
    },
    uploadHouse: async (req,res) =>{
        try{
            const result = await House.create({
              ...req.body
            })
            res.send({message:'data succesfuly upload', data:result})
        }
        catch(error){
            res.send(error)
        }
    },
    updateHouse: async (req,res) =>{
        const {user_id} = req.params
        const {houseTitle, image_url, desc, location} = req.body
        try{
            const result = await House.updateOne({user_id},{
                ...req.body
            })
            res.send({message:'data upload succesfuly', data:result})
        }
        catch(error){
            console.log(error)
            res.send(error)
        }
    },
    deleteHouse: async (req,res) =>{
        const {houseTitle} = req.body;
        try{
            const result = await House.deleteOne({
                houseTitle:houseTitle
            })
            res.send({message:'data deleted', data:result})
        }
        catch(error){
            res.send(error)
        }
       
    }
}
