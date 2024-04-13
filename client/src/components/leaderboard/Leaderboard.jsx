import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import "./leaderboard.css"

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState([]);
	useEffect(()=>{

		const fetchboard=async()=>{

			const res= await axios.get("/api/leaderboard",{withCredentials:true})
			console.log(res.data)
			setLeaderboardData(res.data);
		}

		fetchboard();


	},[])
  return (
	<div className='leaderboard-section'>
		<h1>Leaderboard</h1>


	<div className="table-container">

	
		<table className='sub-leaderboard'>
			<tr>
				<th>NAME</th>
				<th>EXPENSE</th>
			</tr>
			{leaderboardData.map((item,index)=>(
				<tr key={index}>
						<td>{item.name} </td>
						<td>{item.total}</td>
				</tr>
			)

			)}
		</table>
		</div>
	</div>
  )
}

export default Leaderboard