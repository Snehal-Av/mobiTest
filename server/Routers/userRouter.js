const express=require('express')
const { register, logIn} = require('../controllers/userAuthController')
// const authMiddleware = require('../middleware/authMiddleware')
const router=express.Router()

router.post("/register",register)

router.post("/login",logIn)
// router.get("/user",authMiddleware,dashUser)

module.exports=router