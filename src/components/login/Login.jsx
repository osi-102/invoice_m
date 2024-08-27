import React from 'react';
import loginImage from '../../assets/login.jpg'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-black items-center justify-center">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        {/* Background Image for Small Devices */}
        <div className="hidden md:block md:w-1/2 bg-blue-500">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          {/* Background Image for Small Devices */}
          <img
            src={loginImage}
            alt="Login Illustration"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-30 md:hidden"
          />
          <div className="relative max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
            <form>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
