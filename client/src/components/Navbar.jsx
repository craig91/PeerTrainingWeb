import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user }) {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">Dashboard</Link>
        </div>
        <div className="space-x-4">
          <Link to="/signup" className="text-white">Signup</Link>
          <Link to="/login" className="text-white">Login</Link>
          {user && <span className="text-white">Welcome, {user.username}!</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;