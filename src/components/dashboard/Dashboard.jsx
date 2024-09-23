import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa"; // Icons for menu and logout

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the localStorage and redirect to the login page
    localStorage.removeItem('photoURL');
    localStorage.removeItem('cName');
    navigate('/login'); // Assuming '/login' is the route for login
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle hamburger menu
  };

  return (
    <div className="w-full h-screen bg-gray-500 flex flex-col lg:flex-row">
      {/* Side Navigation Bar */}
      <div className="lg:w-1/5 bg-gray-600 p-4 flex flex-col lg:flex-row items-center lg:items-start">
        {/* Mobile Header */}
        <div className="w-full flex justify-between items-center lg:hidden mb-4">
          {/* Profile Info */}
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full mr-2"
              src={localStorage.getItem('photoURL')}
              alt="profile"
            />
            <p className="text-white text-lg">
              {localStorage.getItem('cName')}
            </p>
          </div>
          {/* Logout Icon */}
          <FaSignOutAlt
            onClick={handleLogout}
            className="text-white text-2xl cursor-pointer"
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden w-full flex justify-end mb-4">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-white text-2xl" />
            ) : (
              <FaBars className="text-white text-2xl" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`flex flex-col w-full lg:block ${isOpen ? 'block' : 'hidden'}`}>
          <Link
            to="/"
            className="text-white py-2 px-3 rounded mb-2 hover:bg-gray-900 hover:text-gray-200 no-underline"
          >
            Home
          </Link>
          <Link
            to="/invoices"
            className="text-white py-2 px-3 rounded mb-2 hover:bg-gray-900 hover:text-gray-200 no-underline"
          >
            Invoices
          </Link>
          <Link
            to="/new-invoice"
            className="text-white py-2 px-3 rounded mb-2 hover:bg-gray-900 hover:text-gray-200 no-underline"
          >
            New Invoice
          </Link>
          <Link
            to="/settings"
            className="text-white py-2 px-3 rounded mb-2 hover:bg-gray-900 hover:text-gray-200 no-underline"
          >
            Settings
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 bg-slate-400 p-4">
        <p>Main content goes here</p>
      </div>
    </div>
  );
};

export default Dashboard;
