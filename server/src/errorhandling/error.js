exports.errorhandling = (error,res) =>{
    if(error.name == "TypeError"|| error.name == "validationerror"){
        return res.status(400).send({status: fa , msg: error.message});
    }
   
     if(error.code == 11000){
        return res.status(400).send({
            status: false,
            msg: ` duplicate value provided at ${Object.keys(error.keysValue)} ${Object.values(error.keyvalue)}`});
        }


}