import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the localStorage and redirect to the login page
    localStorage.removeItem('photoURL');
    localStorage.removeItem('cName');
    navigate('/login'); // Assuming '/login' is the route for login
  };

  return (
    <div className="w-full h-screen bg-gray-500 flex">
      {/* Side Navigation Bar */}
      <div className="w-1/5 bg-red-500 p-4 flex flex-col bg-gray-600">
        {/* Profile Info */}
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={localStorage.getItem('photoURL')}
            alt="profile"
          />
          <p className="text-white text-lg">
            {localStorage.getItem('cName')}
          </p>
        </div>
        {/* Logout Button */}
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded mb-6"
          onClick={handleLogout}
        >
          Logout
        </button>
        <hr className="w-full mb-4" />
        {/* Navigation Links */}
        <div className="flex flex-col w-full">
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
      <div className="w-4/5 bg-slate-400 p-4">
        <p>Main content goes here</p>
      </div>
    </div>
  );
};

export default Dashboard;
