const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
      
    },
    number:{
        type:Number,
        required:true,
        
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
})


const PortfolioModel = new mongoose.model("PortfolioModel", portfolioSchema )

module.exports = PortfolioModel;