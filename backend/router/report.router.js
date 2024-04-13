const express=require('express');

const router=express.Router();
const {getDailyExpense,getMonthlyExpense,getYearlyExpense}=require("../controllers/report.controller")
const {verifyToken}=require("../verifyToken")

router.get("/report/:currentDate",verifyToken,getDailyExpense);
router.get("/report/month/:currentMonth",verifyToken,getMonthlyExpense);
router.get("/report/year/:year",verifyToken,getYearlyExpense);


module.exports=router;