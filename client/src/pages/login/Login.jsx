import React from 'react'
import "./login.scss"
import { Link,useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import { AuthContext } from '../../context/authContext';





const Login = () => {
const navigate=useNavigate()
	const {login}=useContext(AuthContext);
	const [input,setInput]=useState({
		name:"",
		password:"",

	})

	const[err,setErr]=useState(null);

	const handleChange=(e)=>{
		e.preventDefault();

		setInput((prev)=>({...prev,[e.target.name]:e.target.value}))

	}

	const handleLogin=async(e)=>{
		e.preventDefault();
		try{

			await login(input);
			navigate("/")
		}
		catch(err){
			console.log(err.response.data)
			setErr(err.message)
		}
	}



  return (
	<div className='login'>
		<div className="card">

			<div className="left">
				<h1>HELLO WORLD</h1>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, magni?</p>
				<span>DON,T HAVE ACCOUNT</span>
				<Link to="/signup">

				<button>REGISTER</button>
				</Link>


			</div>
			<div className="right">
				<h1>LOGIN</h1>
				<form action="">
					<input type="text" placeholder='username' onChange={handleChange} name="name" id="" />
					<input type="text" placeholder='password' onChange={handleChange} name="password" id="" />

					{err && err}
					<button onClick={handleLogin}>LOG IN</button>

					<Link to="/password"> 
					<button>FORGET PASSWORD</button>
					</Link>
				</form>
			</div>


		</div>
	</div>
  )
}

export default Login