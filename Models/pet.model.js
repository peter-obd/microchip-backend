const mongoose = require('mongoose')
const schema = mongoose.Schema

const petSchema = new schema({
  
    microchip : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    dogsParents : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : false
    },
    password : {
        type : String,
        required : true
    }
})

const Pet = mongoose.model('pet', petSchema)

module.exports = Pet