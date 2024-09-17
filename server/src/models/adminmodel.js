
const mongoose = require("mongoose");
const { ValidName, ValidPassword, ValidUserName } = require('../validation/allvalidation')
const adminSchema = new mongoose.Schema({
   
    adminid:{ type: String, trim: true},
    name: {
        type: String, required: [true, "Please provide the Name"],
        validate: [ValidName, "Please provide the User Valid Name"], trim: true
    },
    email: {
        type: String, required: [true, "Please provide the email"],
        validate: [ValidUserName, "Please provide the  Valid email"], unique: true, trim: true
    },
    password: {
        type: String, required: [true, "Please provide the Password"],
        validate: [ValidPassword, "Please provide the  Valid Password"], trim: true
    }
}, { timestamps: true });
module.exports = mongoose.model('admin', adminSchema)





















