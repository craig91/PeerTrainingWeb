import React, { useState } from 'react';

function Login() {
    const [loginData, setLoginData] = useState({
      username: '',
      password: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginData({
        ...loginData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Login successful:', data);
          // Handle successful login (e.g., store token, redirect, etc.)
        })
        .catch(error => console.error('Error logging in:', error));
    };
  
    return (
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default Login;