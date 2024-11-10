const { errorhandling } = require('../errorhandling/error')
const usermodel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { otpsend } = require('../NodeMailer/SendotpVerify.js')
const {createImgURL} = require('../Cloudinary/ImageURL.js')
require('dotenv').config()


exports.createuser = async (req, res) => {
    try {

        const ImageData = req.file;
        const data = req.body;
        const { name, email, password } = data

        
        const randomOtp = Math.floor(1000 + Math.random() * 9000);
        
        const checkUserId = await usermodel.findOneAndUpdate(
            { email: email },
            { $set: { OtpVerification: randomOtp } }
        )
        
        if (checkUserId) {
            otpsend(name, email, randomOtp)
            return res.status(201).send({ status: true, msg: "Successfully Send OTP", id: checkUserId._id })
        }
        
        
        if (ImageData) {
            const img = ImageData.path
            const result = await createImgURL(img)
            data.profileImg = result.secure_url;
        }
        

        const bcryptPassword = await bcrypt.hash(password, 10);
        data.password = bcryptPassword;
        data.OtpVerification = randomOtp;
        const createData = await usermodel.create(data);

        otpsend(name, email, randomOtp)
        return res.status(201).send({ status: true, message: "User Data Created successfully!", data: createData })
    }
    catch (err) { return errorhandling(err, res) }
}

exports.verifyOTP = async (req, res) => {
    try {
        
        const userId = req.params.userId
        const OTP = req.body.OTP
        console.log(typeof OTP)
        const checkOTP = await usermodel.findOneAndUpdate(
            { _id: userId, OtpVerification: OTP },
            { $set: { isOTPVerified: true, OtpVerification: 0 } }
        )
        console.log(OTP,userId,checkOTP)
        if (!checkOTP) return res.status(400).send({ status: false, msg: "Wrong OTP" })

        return res.status(200).send({ Status: true, msg: "verifyed" })
    }
    catch (e) { return res.status(500).send({ status: true, msg: e.message }) }
}


exports.getAllUserData = async (req, res) => {
    try {
        const data = await usermodel.find()
        return res.send({ Status: true, msg: "Get All the data", Data: data })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}


exports.LogInUser = async (req, res) => {
    try {

        const data = req.body;

        const checkMailId = await usermodel.findOne({ email: data.email, isOTPVerified: true })

        if (!data.email) return res.status(400).send({ Staus: false, msg: "Pls Provided Email", })
        if (!data.password) return res.status(400).send({ Staus: false, msg: "Pls Provided password", })

        if (!checkMailId) return res.status(404).send({ Staus: false, msg: "User Not Present pls Signup and Verify Otp", })
        let checkpass = await bcrypt.compare(data.password.trim(), checkMailId.password)

        if (!checkpass) return res.status(400).send({ Staus: false, msg: "Wrong Password", data: checkpass })

        let id = checkMailId._id
        let token = jwt.sign({ UserId: id, }, process.env.JWTAcessToken, { expiresIn: '12h' })

        return res.status(200).send({ status: true, token: token, id: id })
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

        return res.send({ status: true, data: updatedata })
    }

    catch (err) { return errorhandling(err, res) }
}


