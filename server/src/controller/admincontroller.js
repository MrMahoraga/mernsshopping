const { errorhandling } = require('../errorhandling/error')
const adminmodel = require('../models/adminmodel')
const usermodel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()





exports.createadmin = async (req, res) => {
    try {
        console.log(req.body)
      
        const data = req.body;
        if (data.password == undefined) {
            res.send({ status: false, msg: "provide the password first" })
        }
        const bcryptPassword = await bcrypt.hash(data.password, 10);
                  data.password = bcryptPassword;
            const createData = await adminmodel.create(data);
            return res.status(201).send({
                status: true, message: "User Data Created successfully!",
                data: createData
            })
        
      
       
        }
    
    catch (err) { return errorhandling(err, res) }}


    exports.getAllUserData = async (req, res) => {
        try {
            const data = await usermodel.find({isdeleted:false})
            return res.send({ Status: true, msg: "Get All the data", Data: data })
        }
        catch (e) {return res.status(500).send({ status: false, msg: e.message })}
    }


    exports.loginadmin = async (req, res) => {
        try {
            
            const data = req.body;
            const checkMailId = await adminmodel.findOne({ email: data.email })
    
    
            if (!checkMailId) return res.send({ Staus: false, msg: "User Not Present", })
            let checkpass = await bcrypt.compare(data.password.trim(), checkMailId.password)
    
    
            if (!checkpass) return res.send({ Staus: false, msg: "Wrong Password", data: checkpass })
            let id = checkMailId._id
            let token = jwt.sign({
                adminId: id,
                AuthorName: 'Hemant'
            },
                process.env.Adminapisecretkey,
                { expiresIn: '12h' }
            )
            return res.send({ status: true, token, id })
        }
        catch (err) { return errorhandling(err, res) }
    }





    
exports.deleteUserApi = async (req, res) => {
    try {
        // console.log(req.params.UserId)
        let id = req.params.UserId
        // console.log(id)
        const deleteduser = await usermodel.findOneAndUpdate(
            { _id:id },

            { $set: { isdeleted: true } },
            {
                new: true
            }
        )
        return res.status(200).send({ Status: true , data: deleteduser })
    }
    catch (err) { return errorhandling(err, res) }
}


exports.deleteUserApi