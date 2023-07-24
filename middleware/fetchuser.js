const jwt = require("jsonwebtoken")

const fetchuser =(req,res,next)=>{
    // const token = req.cookies.verToken;
    console.log("token")
    next()
}

module.exports = fetchuser