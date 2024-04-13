const db = require("../utils/db");

// exports.leaderboard = (req, res) => {
//     // Retrieve expenses and users from the database
//     db.query('SELECT * FROM expenses', (err, expenseData) => {
//         if (err) {
            
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         db.query('SELECT * FROM users', (err, userData) => {
//             if (err) {
    
//                 return res.status(500).json({ error: 'Internal server error' });
//             }
            
//             const userExpense = {};
//             expenseData.forEach((expense) => {
//                 userExpense[expense.uid] = (userExpense[expense.eid] || 0) + expense.expense;
//             });

//             const userLeaderBoardDetails = [];
//             userData.forEach((user) => {
//                 const name = user.name;
//                 const total = userExpense[user.id] || 0;
//                 userLeaderBoardDetails.push({ name, total });
//             });

            
//             userLeaderBoardDetails.sort((a, b) => b.total - a.total);

//             console.log(userLeaderBoardDetails);
//             res.json(userLeaderBoardDetails);
//         });
//     });
// };

exports.leaderboard=(req,res)=>{
			try{
					const q="SELECT u.name, SUM(e.expense) AS total FROM user u JOIN expens e ON u.id= e.eid GROUP BY u.id,u.name ORDER BY total DESC"

					db.query(q,(err,data)=>{
						if(err) return res.json("error in leaderboard");

						const leaderboard=data.map(row=>({
							name:row.name,
							total:row.total
						}))

						console.log(leaderboard);
						res.json(leaderboard);
					})}


			catch(err){
					res.json(err);

			}}
