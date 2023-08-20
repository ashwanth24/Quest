import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './login.scss'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
function Login() {
  const {login} = useContext(AuthContext)

  const [input ,setInput] = useState({
    username:"",
    psswaord :""
  })
  const [err,setErr] = useState('');
  const navigate = useNavigate()
  function handleChange(e) {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const handleSubmit = async e=>{
    e.preventDefault();
    try {
      await login(input);
      navigate("/")

    } catch (error) {
      console.log(error)
      setErr(error.response.data)
    }
  }
console.log(err)
  return (
    <div className='auth-container'>
        <h1 className="login-text">Login</h1>
        <form action="" className="l-f">
            <input name='username' onChange={handleChange} type="text" className="username input" placeholder='UserName'/>
            <input name='password' onChange={handleChange} type="password" className="password input" placeholder='Password' />
            <button onClick={handleSubmit} className="login-button">Login</button>
            {err&&<span className='error'>{err}</span>}
            <span className="l-register">Do not have an account? 
            <a href="/register" className="reg">Regsister Now</a></span>
        </form>
    </div>
  )
}

export default Login 