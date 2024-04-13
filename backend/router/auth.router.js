const express=require('express');
const router=express.Router();
const {register}=require("../controllers/auth.controller");
const {login}=require("../controllers/auth.controller")

router.post("/signup",register);
router.post("/signin",login);

module.exports=router;