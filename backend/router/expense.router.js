
const express=require("express");
const router=express.Router();

const {addExpense,deleteExpense,updateExpense,getExpense,downloadExpense,pagination}=require("../controllers/expense.controller");
const {verifyToken}=require("../verifyToken");

router.get("/add",verifyToken,getExpense);
router.post("/add",verifyToken,addExpense);
router.delete("/add/:id",verifyToken,deleteExpense);
router.put("/add/:id",verifyToken,updateExpense);
router.get("/add/download",verifyToken,downloadExpense);




module.exports=router;