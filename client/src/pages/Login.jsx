import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const data = response.data;
        console.log('Login successful:', data);
        if (data.user && data.token) {
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setLoginData({ username: '', password: '' });
          console.log('Form fields reset');
          navigate('/dashboard');
        } else {
          console.error('No user data in response');
        }
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#272838]">
      <div className="bg-[#F9F8F8] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#272838]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#272838]">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-[#7E7F9A] rounded-md shadow-sm focus:outline-none focus:ring-[#F3DE8A] focus:border-[#F3DE8A] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#272838]">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-[#7E7F9A] rounded-md shadow-sm focus:outline-none focus:ring-[#F3DE8A] focus:border-[#F3DE8A] sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#272838] bg-[#EB9486] hover:bg-[#F3DE8A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F3DE8A]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;