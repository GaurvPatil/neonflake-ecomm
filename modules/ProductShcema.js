const mongoose = require("mongoose")

const pSchema = new mongoose.Schema({
    title:{
        type:"String",
        required:true,
        
    },
    image: {
        type: "String",
        required: true,
      },
      description:{
        type:"String",
        required:true,  
    },
    price:{
        type:"Number",
        required:true,
    },
})

const product = mongoose.model("product" , pSchema)
module.exports = {
    product
}