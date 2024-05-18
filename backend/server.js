const express=require('express');
const app= express();
const port=process.env.PORT || 3000;
const cors=require("cors")
const dot=require("dotenv");
dot.config();
const path=require("path");


const db=require("./utils/db");
const cookieParser=require('cookie-parser')

const authRouter=require("./router/auth.router");
const expenseRouter=require("./router/expense.router");
const premiumRouter=require("./router/premium.router");
const leaderboardRouter=require("./router/leaderboard");
const passwordRouter=require("./router/password.router");
const reportRouter=require("./router/report.router");


app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials"," true");
	next();
});


app.use(express.json());
// Configure CORS
app.use(cors({
	origin: 'http://localhost:5173' ,// Allow requests from this origin
	credentials: true // Allow credentials (e.g., cookies) to be sent with the request
  }));
app.use(cookieParser())




app.use("/api",authRouter);
app.use("/api",expenseRouter);
app.use("/api",premiumRouter);
app.use("/api",leaderboardRouter);
app.use("/api",passwordRouter);
app.use("/api",reportRouter);


	const buildpath=(path.join(__dirname,"../client/dist"));
	console.log(buildpath);
	console.log("hi");

app.use(express.static(buildpath));

app.get("/api/getkey",(req,res)=>{
	res.status(200).json({key: "process.env.RZP_KEY_ID"})
})
app.listen(port,()=>{
	console.log(`server is running at ${port}`)
})