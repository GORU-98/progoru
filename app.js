// const mongoose =require("mongoose")
const express=require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config({path:"./config.env"})
require("./mongoose/Conn");
const PortfolioModel = require("./mongoose/Schema")
const UserModel = require("./mongoose/User")
const fetchuser = require("./middleware/fetchuser")

const port = process.env.PORT || 9000;
const app = express();
app.use(express.json());


const cors=require("cors")
app.use(cors())


app.post("/signin", async (req,res)=>{
    try {

        let User= await UserModel.findOne({email:req.body.email})

        if(User){
            throw new Error
        }
        
        let pass = req.body.password;
        let cpass = req.body.cpassword;

        if(pass===cpass){
            const securePass = await bcrypt.hash(pass,10)
            const secureCpass = await bcrypt.hash(cpass,10)
           
            User = await new UserModel({
                name:req.body.name,
                email:req.body.email,
                password:securePass,
                cpassword:secureCpass,
            });
            const result = await User.save();
                
                // res.status(201).send(result.tokens[0].token)

               
            // console.log(result)
            // token = await User.generatejwttoken();
           
            //creating jsonwebtoken
            // const jwtt= jwt.sign({_id:result._id},process.env.SECRET_KEY)
            // res.status(201).send(jwtt)
            // res.cookie("jwtoken",jwtt,{expires:new Date(Date.now + 240000000000)})
           
        }else{
            res.status(400).send("password and confirm password are not matching")
        }
//hashing of password

    } catch (error) {
        res.status(400).send("Server Error")
    }
})

app.post("/login", async (req,res)=>{
    try {

        if(!req.body.email || !req.body.password){
            
            res.status(400).send("plz enter valid credentials")
        }
      let User = await UserModel.findOne({email:req.body.email})
      if(!User){
           res.status(401).send("user not found")
        }else{
          let pass = req.body.password;
          let cpass = User.password;
          const validPass = await bcrypt.compare(pass,cpass)
        //   console.log(validPass)
          if(!validPass ){
              res.send("plz enter valid password")
        }else{
            const validToken =  jwt.verify(User.tokens[0].token , "mynameisgorupanchal")
            if(!validToken){
              throw new Error
            }
        
            res.send(User)
          }

      }

    } catch (error) {
        console.log(error)
    }
})


app.post("/contact" ,async (req,res)=>{
  
        try {
            const {name,email,number,message,subject} = req.body;
            if(!name || !email || !number || !message || !subject){
                res.status(402).send("plz fill all the fields")
            }
            const portf = await new PortfolioModel(req.body);
            const result = await portf.save()
            res.status(201).send({message:"info collected successfully",status:200})
            
        } catch (error) {
            res.status(404).send("server error")
        }
    
    
})
app.get("/f" ,async (req,res)=>{
  
      
            const portf = await PortfolioModel.find();
         
            res.status(201).send(portf)
       
    
    
})

app.listen(port,()=>{
    console.log(`my app is running on port:${port}`)
})