const express=require("express");


const router=express.Router();
const {leaderboard}=require("../controllers/leaderboard.controller")

router.get("/leaderboard",leaderboard)



module.exports=router;