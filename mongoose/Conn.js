const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://goru2k18:gourav$1234@cluster0.m643iuo.mongodb.net/portf?retryWrites=true&w=majority`).then(()=>{
    console.log("connection is successful")

}).catch((e)=>{
    console.log(`connection is not successful due to the error: ${e}`)
})


