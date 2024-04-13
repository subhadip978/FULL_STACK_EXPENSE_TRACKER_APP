const mysql=require('mysql2');


const pool=mysql.createPool({
	host:process.env.DB_HOST,
	user:process.env.DB_USERNAME,
	database:process.env.DB_NAME,
	password:process.env.DB_PASS,
	connectionLimit:"10"
})

pool.getConnection((err,connection)=>{
	if(err){
		console.log(err)
	};
	console.log(`database is connected`)
	connection.release();
})

module.exports=pool;