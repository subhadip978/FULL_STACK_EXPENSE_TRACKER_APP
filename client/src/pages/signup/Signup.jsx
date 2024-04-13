import React from 'react'
import "./signup.scss"
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';


const Signup = () => {

	const [input,setInput]=useState({
		name:"",
		email:"",
		password:"",

	})


	const[err,setErr]=useState(null);
	

	const handleChange=(e)=>{
		e.preventDefault();

		setInput((prev)=>({...prev,[e.target.name]:e.target.value}))

	}

	const handleClick=async(e)=>{
		e.preventDefault();

		try{
			await axios.post("/api/signup",input)
			
		}
		catch(err){
			console.log(err)
			setErr(err.response.data);

		}}
		console.log(err)

  return (
	<div className='register'>
		<div className="card">

			<div className="left">
				<h1>HELLO WORLD</h1>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, magni?</p>
				<span>DON;T HAVE ACCOUNT</span>
				<Link to="/login">

				<button>LOG IN</button>
				</Link>

			</div>
			<div className="right">
				<h1>SIGN UP</h1>
				<form action="">
					<input type="text"		placeholder='name' 		onChange={handleChange}	name="name" id="" />
					<input type="text"		placeholder='email' 	onChange={handleChange}			name="email" id="" />
					<input type="text"		placeholder='password'	onChange={handleChange}	 name="password" id="" />

					{err && err}
					<button onClick={handleClick}>SIGN UP</button>
				</form>
			</div>


		</div>
	</div>
  )
}

export default Signup