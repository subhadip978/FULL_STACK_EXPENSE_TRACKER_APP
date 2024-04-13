import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

import Report from "../../components/report/Report";
import "./home.css"
import axios from "axios";


const Home = () => {

	const { handlePremium } = useContext(AuthContext);
	const { premiumUser } = useContext(AuthContext)
	const [expenses, setExpenses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [url, setDownloadurl] = useState('');


	const fetchData = async (page) => {
		try {
			const res = await axios.get(`/api/add?page=${page}&pageSize=3` ,{withCredentials:true})
			setExpenses(res.data);
			console.log(res.data);
		}
		catch (err) {
			console.log(err) ;
		}
	}


	useEffect(() => {
		fetchData(currentPage)
	}, [])

	useEffect(() => {
		fetchData(currentPage)
	}, [currentPage]);



	const checkHandler = async () => {
		await handlePremium();
	}


	const handleDelete = async (Id) => {

		await axios.delete(`/api/add/${Id}`)
		setExpenses(expenses.filter(item => item.id !== Id));
		
	}

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	}

	const handlePrevPage = () => {
		setCurrentPage(currentPage - 1);
	}

	useEffect(() => {

		const handleDownload = async () => {
			const res = await axios.get("/api/add/download" ,{withCredentials:true});
			console.log(res.data)
			setDownloadurl(res.data);

		};
		handleDownload();
	}, [])





	return (
		<div className="home-section">
			<h1>Track Your Expense </h1>
			<table className="expenses">
				<tbody>


					<tr>
						<th>CATEGORY</th>
						<th>DESCRIPTION</th>
						<th>EXPENSE</th>
					</tr>

					{expenses.length > 0 ? (
						expenses.map((item) => (
							<tr key={item.id} className="item">
								<td>{item.category}</td>
								<td>{item.description}</td>
								<td>{item.expense}</td>
								<td>
									<button><Link to={`/update/${item.id}`}>UPDATE</Link></button>
								</td>
								<td>

									<button onClick={() => handleDelete(item.id)}>DELETE</button>
								</td>
							</tr>

						))
					) : (

						<tr>
							<td>

								<p>No expenses available</p>
							</td>
						</tr>
					)}

				</tbody>

			</table>
			<div className="pri-button">

				<button onClick={handlePrevPage}>Prev</button>
				<button onClick={handleNextPage}>Nexte</button>
			</div>

			<div className="button2">

				<button  ><Link to="/add">ADD NEW EXPENSE</Link></button>
				{
					!premiumUser && (
						<button onClick={checkHandler}>MEMBERSHIP</button>)
				}
			</div>

			{premiumUser !== null && (
				<div className="premium-section">
					<button><Link to="/leaderboard">Show Leaderboards</Link>
					</button>



					<div className="report">
						<button>
							<Link to="/report">CHECK EXPENSES REPORT</Link>

						</button>
					</div>
					{url ? (

						<a href={url} download="expense.json" >download expense</a>
					) : (
						<button disabled>Fetching URL...</button>
					)}


				</div>

			)}

		</div>

	)
}

export default Home;