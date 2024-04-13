
const db=require("../utils/db") 
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken")

exports.register=(req,res)=>{

const q="SELECT * FROM user WHERE name=?"

db.query(q,[req.body.name],(err,data)=>{
	if(err)return res.status(500).json(err);

	if(data.length)return res.status(409).json("USER ALREADY EXIST");

	const salt=bcrypt.genSaltSync(5);
	const hashedPassword=bcrypt.hashSync(req.body.password,salt)


	const q='INSERT INTO user (`name`,`email`,`password`) VALUE(?)';
	const values=[
		req.body.name,req.body.email,hashedPassword
	]
	db.query(q,[values],(err,data)=>{
		if(err)return res.json(err);
		return res.json("user has been created");

	})


})

}

exports.login=(req,res)=>{

			const q="SELECT * FROM user WHERE name=?"

			db.query(q,[req.body.name],(err,data)=>{
				if(err)return res.send(err)

				if(data.length===0) return res.status(404).send("user does not exist");

				const correctPassword=bcrypt.compareSync(req.body.password,data[0].password);
				if(!correctPassword) return res.status(402).json("wrong password");

				const token=jwt.sign({id:data[0].id},process.env.SECRET_KEY)
				console.log(token)
				
				const{password,...others}=data[0];
				res.cookie("accessToken",token,{
					httpOnly:true,
				})
				.status(200)
				.json(others)

				
			})
}