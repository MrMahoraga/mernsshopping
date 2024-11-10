const {errorhandling}= require("../Errorhandling/errorhandling.js")
const jwt = require("jsonwebtoken")
const shopkeepmodel = require ("../model/shopkeepmodel.js")
const bcrypt = require ("bcrypt")
require("dotenv").config()

exports.Createshopkeeper = async(req,res)=>{
try{

    const data = req.body
    const passbcrypt = await bcrypt.hash(data.password, 5)
    data.password = passbcrypt
    const createdata = await shopkeepmodel.create(data) 
    return res.status(201).send({ status: true, msg: "suf Created", Data: createdata })


}
catch(err){return errorhandling(err,res)}
}

exports.Loginshopkeeper = async(req,res)=>{
    try{
        const data = req.body
        const {userName , password} = data
        if(!userName){return res.status(400).send({status: false , msg: "plz provide username"})}
        if(!password){return res.status(400).send({status: false , msg: "plz provide password"})}

        const checkMailId = await shopkeepmodel.findOne({userName : userName})
        if(!checkMailId) {return res.status(404).send({status: false , msg: "plz login"})}

                let checkpass = await bcrypt.compare(password.trim(),checkMailId.password)
            if (!checkpass) return res.status(400).send({ Staus: false, msg: "Wrong Password",data:checkpass })
                
                let id = checkMailId._id
                
                let token = jwt.sign({
                    UserId:id,
                    AuthorName:'Tarun'
                },
               process.env.Adminacesssecretkey,
                {expiresIn:'12h'}
            )

            return res.status(200).send({status:true,token,id})



    }
    catch(err){return errorhandling(err,res)}
}