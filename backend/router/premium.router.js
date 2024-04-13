const express=require("express");

const router=express.Router();

const {addPremium, updateTransection}=require("../controllers/premium.controller");
const {verifyToken}=require("../verifyToken");

router.get("/premium",verifyToken,addPremium);
router.post("/premium/update",verifyToken,updateTransection);

module.exports=router;