import React, { useEffect, useState } from 'react'

import axios from 'axios';



const Password = () => {
	const [email,setEmail]=useState('');
	const [data,setData]=useState("");

	const handleChange=(e)=>{
		e.preventDefault()
		
		setEmail(e.target.value)
	}

	const handleClick=async(e)=>{
		e.preventDefault()
		try{
			console.log(email);
			 const res=await axios.post("http://localhost:3000/api/forget",
			 {email})
			 console.log(res);
		}
		catch(err){
			console.log(err)
		}
		

	}

	const userValid=async()=>{
		await axios.get("http://localhost:3000/api/authpassword/${id}")
		console.log("user valid")
	}

	useEffect(()=>{
		userValid()
		setTimeout(()=>{
			setData(true)
		})
	})

  return (
	<div>


		{data?(
		<div>
			<input type="text"  placeholder='email' name="email" onChange={handleChange}/>
			
			<button onClick={handleClick}>OK</button>
			</div>
			
			):
			
			<p>loading</p>
			}
			

		</div>
			

				
  )
}

export default Password