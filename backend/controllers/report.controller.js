const db=require("../utils/db")

exports.getDailyExpense=(req,res)=>{

	const q="SELECT * FROM expens WHERE eid= ? AND date= ?";
	const values=[req.user.id, req.params.currentDate];
	db.query(q,values,(err,data)=>{
		if(err) return res.status(500).json({message:"error in geDailyExpense controller"});

		if(data.length==0) return res.status(200).json("no expense found")
		
		res.status(202).json({message:data})

	})	
}

exports.getMonthlyExpense=(req,res)=>{
	const userId=req.user.id ;
	const month=req.params.currentMonth;
	const[year,Month]=month.split("-");

	const q= "SELECT * FROM expens WHERE eid=? AND MONTH(date)=? ";
	const values=[userId,Month]
	db.query(q,values,(err,data)=>{
		if(err) return res.status(404).json({message:"error in getMonthlyExpense"});


		if(data.length==0) return res.status(406).json({message:"no expense found"})

		res.status(200).json({message:data});
	})

}


exports.getYearlyExpense=(req,res)=>{

	const q= "SELECT * FROM expens WHERE eid= ? AND YEAR(date)=?";
	const values=[req.user.id, req.params.year];
	db.query(q,values,(err,data)=>{
		if(err) return res.status(404).json({message:"error in getYearlyExpense",err});

		res.status(400).json({message:data});
	})

}