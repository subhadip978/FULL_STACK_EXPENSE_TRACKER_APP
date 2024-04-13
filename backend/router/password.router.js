const express=require('express');

const {forgetPassword,resetPassword, authpassword}=require("../controllers/password.controller.js");
const router=express.Router();



router.post("/forget",forgetPassword);
router.get("/authpassword/:id",authpassword)
router.put("/reset/:id",resetPassword);



module.exports=router;