import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',  
        username: '',   
        password: ''    
    });

    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        }); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Signup successful:', data);
            navigate('/login');
        })
        .catch(error => console.error('Error signing up:', error));
    };


    return (
      <div className="flex items-center justify-center min-h-screen bg-[#272838]">
        <div className="bg-[#F9F8F8] p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#272838]">Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-[#272838]">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-[#7E7F9A] rounded-md shadow-sm focus:outline-none focus:ring-[#F3DE8A] focus:border-[#F3DE8A] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-[#272838]">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-[#7E7F9A] rounded-md shadow-sm focus:outline-none focus:ring-[#F3DE8A] focus:border-[#F3DE8A] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#272838]">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-[#7E7F9A] rounded-md shadow-sm focus:outline-none focus:ring-[#F3DE8A] focus:border-[#F3DE8A] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#272838]">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formData.username}
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
                value={formData.password}
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
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Signup;