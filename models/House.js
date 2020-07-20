const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    houseType:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image_url:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

const House = mongoose.model('house', HouseSchema);

module.exports = House;