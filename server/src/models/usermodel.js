
const mongoose = require("mongoose");
const { ValidName, ValidPassword, ValidUserName } = require('../validation/allvalidation')
const userSchema = new mongoose.Schema({
    profileImg: { type: String, trim: true },
    name: {
        type: String, required: [true, "Please provide the Name"],
        validate: [ValidName, "Please provide the User Valid Name"], trim: true
    },
    userName: {
        type: String, required: [true, "Please provide the Username"],
        validate: [ValidUserName, "Please provide the  Valid Username"], unique: true, trim: true
    },
    password: {
        type: String, required: [true, "Please provide the Password"],
        validate: [ValidPassword, "Please provide the  Valid Password"], trim: true
    }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema)





















