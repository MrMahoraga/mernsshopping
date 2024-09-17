const { errorhandling } = require('../errorhandling/error')
const usermodel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIKey,
    api_secret: process.env.APiSecretKey
});

exports.createuser = async (req, res) => {
    try {
        const ImageData = req.file;
        const data = req.body;
        console.log(data.password, req.file)
        if (data.password == undefined) {
            res.send({ status: false, msg: "provide the password first" })
        }
        const bcryptPassword = await bcrypt.hash(data.password, 10);
        if (ImageData == undefined) {
            data.password = bcryptPassword;
            const createData = await usermodel.create(data);
            return res.status(201).send({
                status: true, message: "User Data Created successfully!",
                data: createData
            })
        }
        const result = await cloudinary.uploader.upload(ImageData.path)
        data.profileImg = result.secure_url;

        console.log(ImageData)
        data.password = bcryptPassword;
        const createData = await usermodel.create(data);
        return res.status(201).send({ status: true, message: "User Data Created successfully!", data: createData })
    }
    catch (err) { return errorhandling(err, res) }
}
// catch(err) { return res.send(err.message)}
// }
exports.getAllUserData = async (req, res) => {
    try {
        const data = await usermodel.find()
        return res.send({ Status: true, msg: "Get All the data", Data: data })
    }
    catch (e) {return res.status(500).send({ status: false, msg: e.message })}
}
exports.LogInUser = async (req, res) => {
    try {
        console.log(req.body)
        const data = req.body;
        const checkMailId = await usermodel.findOne({ email: data.email })


        if (!checkMailId) return res.send({ Staus: false, msg: "User Not Present", })
        let checkpass = await bcrypt.compare(data.password.trim(), checkMailId.password)


        if (!checkpass) return res.send({ Staus: false, msg: "Wrong Password", data: checkpass })
        let id = checkMailId._id
        let token = jwt.sign({
            UserId: id,
            AuthorName: 'Hemant'
        },
            process.env.JWTAcessToken,
            { expiresIn: '12h' }
        )
        return res.send({ status: true, token, id })
    }
    catch (err) { return errorhandling(err, res) }
}


exports.updateApi = async (req, res) => {
    try {

        let id = req.params.userId

        let data = req.body
        console.log(id, data.name)
        const updatedata = await usermodel.findOneAndUpdate(
            { _id: id },
            { $set: { name: data.name } },
            { new: true }
        )

        return res.send({ status: true, data:updatedata })
    }

    catch (err) { return errorhandling(err, res) }
}


