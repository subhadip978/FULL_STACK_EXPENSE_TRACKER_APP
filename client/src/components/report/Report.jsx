import React from 'react'
import { useState } from 'react';

import axios from 'axios';
import "./report.css"

const Report = () => {
const [currentDate,setCurrentDate]=useState('');
const[expense,setExpense]=useState([]);
const[currentMonth,setMonth]=useState('');
const[monthlyExpense,setMonthlyExpense]=useState([]);
const[err,setErr]=useState('')

const handleChange=(e)=>{
	
	setCurrentDate(e.target.value);

}

const handleClick=async(currentDate)=>{
	try{
		console.log(currentDate)
		const res= await axios.get(`/api/report/${currentDate}`);
		console.log(res.status);
		if(res.status==202){

			setExpense(res.data.message);
		}
		else{
			setErr('no expense found');
		}
	}
	catch(err){
		console.log(err);
	}

}

const handleMonth=(e)=>{
	setMonth(e.target.value);
}

const handleMonthclick=async(currentMonth)=>{
	console.log(currentMonth)

	const res= await axios.get(`/api/report/month/${currentMonth}`);
	console.log(res);
	setMonthlyExpense(res.data.message);

}

  return (
	<div>

	
	<div className='report-section'>
		<h1>DAILY EXPENSES</h1>
		<input type="date" name="" id="date" value={currentDate} placeholder='Plase enter date' onChange={handleChange} />
		<button onClick={()=>handleClick(currentDate)}>Click</button>

			{err &&  <h1> {err}  </h1>}
	<table className='report-table'>

	
		<tr>
			<th>DATE</th>
			<th>CATEGORY</th>
			<th>DESCRIPTION</th>
			<th>EXPENSE</th>
			</tr>
			{ expense.map((e)=>(
			


				<tr key={e.id} className='reportlist'>
				<td >{e.date.slice(0,10)}</td>
				<td>{e.category} </td>
				<td> {e.description}</td>
				<td>{e.expense} </td>
			</tr>
				
			))}
</table>
</div>

<div className='report-section'>

<h1>MONTHLY EXPENSES</h1>
<input type="month" placeholder='enter the month' onChange={handleMonth} />
<button onClick={()=>{handleMonthclick(currentMonth)}}>Click</button>

				<table className='report-table'>
					<tr>
						<th>DATE</th>
						<th>CATEGORY</th>
						<th>DESCRIPTION</th>
						<th>EXPENSE</th>
					</tr>
					{monthlyExpense.map((e)=>(

					<tr key={e.id} className='reportlist'>
						<td>{e.date.slice(0,10)}</td>
						
						<td>{e.category}</td>
						<td>{e.description}</td>
						<td>{e.expense}</td>
					</tr>
					))}
					

				</table>
	</div>
	</div>
  )
}

export default Report