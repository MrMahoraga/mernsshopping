const express = require("express")
const router =  express.Router()
const { createuser,getApI,LogInUser } = require("../controller/UserController")

router.post('/createuser',createuser)
router.post('/getApI',getApI)
router.get('/LogInUser',LogInUser)


router.all('./*', (req,res)=>{
    return res.status(404).send({status:false, msg:"Invalid Url"})
} )

module.exports = router;