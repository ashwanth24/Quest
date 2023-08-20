import React, { useState } from 'react'
import axios from 'axios'
import './register.css'
function Register() {
  const [input ,setInput] = useState({
    username:"",
    email:"",
    psswaord :""
  })
  const [err,setErr] = useState(null)
  const handleChange = e=>{
    setInput(prev=>({...prev,[e.target.name]: e.target.value}))
  }
  const handleSubmit = async e=>{
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register',input)
      console.log(res)

    } catch (error) {
      console.log(error)
      setErr(err.response.data)
    }
  }
  return (
    <div className='auth-container'>
    <h1 className="register-text">Register</h1>
    <form className="r-f">
        <input type="text" name='username' onChange={handleChange} className="username input" placeholder='UserName' />
        <input type="text" name='email' onChange={handleChange} className="mail input" placeholder='E-mail' />
        <input type="text" name='password' onChange={handleChange} className="password input" placeholder='password' />
        <button onClick={handleSubmit} className="register-button">Login</button>
        {err && <span className='error'>There was an error!</span>}
        <span className="l-register">have an account? 
        <a href="/login" className="reg">Login</a></span>
    </form>
</div>
)
  
}

export default Register