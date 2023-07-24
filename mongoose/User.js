const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
      
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
            }
        }
    ],
    messages:[
        {
            message:{
                type:String,
            }
        }
    ]
})


userSchema.pre("save",function () {
    // console.log("goru")
    try {
        let token=  jwt.sign({ _id: this._id }, "mynameisgorupanchal")
         this.tokens=  this.tokens.concat({ token: token })
         // this.save();
        
        
         return token;
        
        
    } catch (error) {
        console.log(error)
    }
    // next()

        })
        
        const UserModel = new mongoose.model("UserModel", userSchema )
        
        module.exports = UserModel;