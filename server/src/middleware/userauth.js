const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.authenticate= (req,res,next) => {
    try{
           let token = req.headers["x-api-key"]
           if(!token){ return res.status(400).send({ status: false, msg: " token must be present"})}
           let debcodetoken = jwt.verify(token,process.env.JWTAcessToken)
           if(!debcodetoken){ return res.status(400).send({ status: false, msg: " invalid token"})}
           req.userId = debcodetoken.UserId
           next()
    }
    catch(err){  return res.status(500).send({status: false, msg: err.message})}
}

exports.Authorisation = async( req,res,next) =>{
    try{
        let id = req.params.userId
        if(id==req.userId){
            req.userId =id
            next()
        }

    }
    catch(err){  return res.status(500).send({status: false, msg: err.message})}
}