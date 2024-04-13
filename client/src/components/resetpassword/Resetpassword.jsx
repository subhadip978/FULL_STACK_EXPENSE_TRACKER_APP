import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';




const ResetPassword = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [err,setError]=useState();

  const handleChange = (e) => {
    setPassword(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.put(`/api/reset/${id}`, { password });
      console.log(res);

      if(res.status===201){

        navigate("/login");
      }

    }
    catch (err) {
      console.log(err);
      setError("please try again later")
    }

  }

  return (
    <div>
      UPDATE YOUR Password
      <form action="">


        <label htmlFor="password">Set Password</label>
        <input type="password" placeholder="password" name="password" onChange={handleChange} />
        <button onClick={handleClick}>SUBMIT</button>

      </form>

      {err && <p>{err}</p>}
    </div>
  );
}

export default ResetPassword;
