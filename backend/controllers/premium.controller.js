const Razorpay=require("razorpay");
const db=require("../utils/db");

exports.addPremium = async (req, res) => {
    try {
        console.log( process.env.RZP_KEY_ID)
		var rzp = new Razorpay({
			key_id: process.env.RZP_KEY_ID,
            key_secret: process.env.RZP_SECRET
        });
        console.log(process.env.RZP_SECRET)
		
        const options = {                    
			amount: 3000,
            currency: "INR"
        };
		
        
            console.log(req.user.id);
        const order = await rzp.orders.create(options);
		console.log(order);
         const q = "INSERT INTO `order` (`orderid`, `status`,`oid`) VALUES (?,?,?)";
         const values = [order.id, "PENDING",req.user.id];
         db.query(q, values, (err, data) => {
             if (err) {
                 return res.status(500).json({ error: "Error inserting order into database",err });
             }          
            res.status(200).json({
                success: true,
                order
            });
        });
    } catch (error) {
        console.error("Error in addPremium controller:", error);
        res.status(500).json({ error: "Internal server error",error });
    }
};



	exports.updateTransection=(req,res)=>{

		try{
				const q= "UPDATE `order` SET  `paymentid`=?, `status`=?  WHERE orderid=?  ";
				const values=[
					req.body.payment_id,
					"SUCCESSFULL",
					req.body.order_id,


				]
				db.query(q,values,(err,data)=>{
					if(err) {
                    console.log(err);
                    return res.status(401).json("error in updating transection")
                    }
					res.status(200).json({success:true,message:"transection updated"});

				})
 }
	
	catch(err){
		console.log(err);
	}
}


