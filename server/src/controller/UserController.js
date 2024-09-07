const {errorhandling} = require('../errorhandling/error')
const usermodel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require ('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
cloud_name: process.env.CloudName,
api_key: process.env.APIKey,
api_secret:process.env.APiSecretKey,
});
exports.createuser = async (req, res) => {
    try {
        const ImageData = req.file;
        const data = req.body ;
   if(ImageData == undefined ){
    const createData = await usermodel.create(data);
    return res.status(201).send({status:true, message: 'User Data Created Succesfully!!!', data: createData})
}
const result = await cloudinary.uploader.upload(ImageData.path)
data.profileImg = result.secure_url;
        const passbcrypt = await bcrypt.hash(data.password, 5)
        data.password = passbcrypt
        const createdata = await usermodel.create(data)
        return res.send({ status: true, msg: "suf Created", Data: createdata })
    }
    catch (err) { return errorhandling(err, res) }
}
exports.getApI = async (req, res) => {
    try {
        const data = await usermodel.find()
        return res.send({ Status: true, msg: "Get All the data", Data: data })
    }
    catch (e) {
        return res.status(500).send({ status: false, msg: e.message })
    }
}
exports.LogInUser = async (req, res) => {
    try {
        const data = req.body;
        const checkMailId = await usermodel.findOne({ userName: data.userName })
        if (!checkMailId) return res.send({ Staus: false, msg: "User Not Present", })
        let checkpass = await bcrypt.compare(data.password.trim(), checkMailId.password)
        if (!checkpass) return res.send({ Staus: false, msg: "Wrong Password", data: checkpass })
        let id = checkMailId._id
        let token = jwt.sign({
            UserId: id,
            AuthorName: 'Tarun'
        },
            "SecrectKeysdb",
            { expiresIn: '12h' }
        )
        return res.send({ status: true, token, id })
    }
    catch (err) { return errorhandling(err, res) }
}