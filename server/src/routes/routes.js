const express = require("express")
const router =  express.Router()
const multer = require('multer')
const { createuser,LogInUser, updateApi,} = require("../controller/UserController")
const {loginadmin,getAllUserData,createadmin,deleteUserApi} = require("../controller/admincontroller")
const{authenticate,Authorisation} = require("../middleware/userauth")
const{adminAuthenticate,adminAuthorisation} = require("../middleware/adminauth")

const upload = multer({ storage: multer.diskStorage({}), });



router.post('/createuser',upload.single("profileImg"),createuser)
router.post('/LogInUser',upload.single(),LogInUser)
router.put('/updateApi/:userId',upload.single(),authenticate,Authorisation,updateApi)



// admin

router.post('/loginadmin',upload.single(),loginadmin)
router.post('/createadmin',upload.single(),createadmin)
router.get('/getAllUserData',adminAuthenticate,getAllUserData)
router.delete('/deleteUserApi/:UserId',adminAuthenticate,adminAuthorisation,deleteUserApi)


router.all('/*', (req,res)=>{
    return res.status(404).send({status:false, msg:"Invalid Url"})
} )

module.exports = router;