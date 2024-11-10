
exports.errorhandling = (error, res) => {
    if (error.name == 'TypeError'||error.name == "ValidationError") {
        return res.status(400).send({ status: false, msg: error.message });
    }
   
    if (error.code == 11000) {
        return res.status(400).send({
            status: false,
            msg: `this mail id Already Presnt in DataBAse ${Object.keys(error.keyValue)} - ${Object.values(error.keyValue)}`})
        }
    }