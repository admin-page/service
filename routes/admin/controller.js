const {Admin} = require('../../models');
const bcrypt = require('bcryptjs');
const {createToken} = require('../../helpers')

module.exports = {
    register: async (req,res) =>{
        const {email, password} = req.body;

        try{
           const checkEmail = await Admin.findOne({
               email
           }).exec();
           if(checkEmail){
               return res.send({message:'Email has been registered'})
           }

           const salt = bcrypt.genSalt(10);


        }
        catch(error){

        }
    }
}