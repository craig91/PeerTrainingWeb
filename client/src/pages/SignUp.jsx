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
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;