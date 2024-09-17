const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.adminAuthenticate= (req,res,next) => {
    try{
           let token = req.headers["x-api-key"]
           if(!token){ return res.status(400).send({ status: false, msg: " token must be present"})}
           let debcodetoken = jwt.verify(token,process.env.Adminapisecretkey)
           if(!debcodetoken){ return res.status(400).send({ status: false, msg: " invalid token"})}
           req.adminId = debcodetoken.adminId
           next()
    }
    catch(err){  return res.status(500).send({status: false, msg: err.message})}
}

exports.adminAuthorisation = async( req,res,next) =>{
    try{
        let id = '66e9a581041b3d3dc45b388a'
        if(id==req.adminId){
            req.adminId =id
            next()
        }

    }
    catch(err){  return res.status(500).send({status: false, msg: err.message})}
}



exports