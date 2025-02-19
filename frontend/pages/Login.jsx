import React from 'react'
import Navbar from '../components/Navbar'
import UseLogin from '../hooks/UseLogin'


const Login = () => {
  const { login, error } = UseLogin();
  
  const handleSubmit = async (e)=> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await login({ email, password });
  }

  return (
    <>
    <Navbar />
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-heading">
        Login
      </h2>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" />
        { error && <div className="error error-email"></div> }
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" />
        { error && <div className="error error-password"></div> }
      </div>

      <button className='form-btn'>Login</button>
    </form>
    </>
  )
}

export default Login