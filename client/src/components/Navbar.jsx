import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-[#272838] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-[#F9F8F8] text-xl font-bold">Home</Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-[#F9F8F8]">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-[#EB9486] text-[#272838] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#F3DE8A]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[#F9F8F8] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#7E7F9A]">Login</Link>
                <Link to="/signup" className="text-[#F9F8F8] px-3 py-2 rounded-md text-sm font-medium hover:bg-[#7E7F9A]">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;