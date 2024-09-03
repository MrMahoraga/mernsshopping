const express = require("express")
const router =  express.Router()

router.get('/test',(req,res) => {
    return res.send({msg:"kirmadada"})
})
module.exports = router