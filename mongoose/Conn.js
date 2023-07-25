const mongoose = require("mongoose")

mongoose.connect(`mongodb://127.0.0.1:27017/portfolio`).then(()=>{
    console.log("connection is successful")

}).catch((e)=>{
    console.log(`connection is not successful due to the error: ${e}`)
})


