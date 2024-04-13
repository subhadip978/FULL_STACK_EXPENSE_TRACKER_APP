
const jwt=require("jsonwebtoken");

exports.verifyToken=(req,res,next)=>{

	const token=req.cookies.accessToken;
	if(!token){
		return res.status(403).send("you are not logged in");
	}
	jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
		if(err) return res.status(401).json(err) ;
		console.log('in verifytoken')

		req.user=user;
		next()

	})
	
}