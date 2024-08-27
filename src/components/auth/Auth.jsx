import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="flex min-h-screen bg-black items-center justify-center">
      <div className="flex flex-row max-w-6xl w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        {/* Left Section: Image */}
        <div className="w-1/2 bg-blue-500 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/500"
            alt="Auth Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section: Form Toggle */}
        <div className="w-1/2 flex items-center justify-center bg-white p-8">
          <div className="max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {isRegistering ? 'Register' : 'Login'}
            </h2>
            <form>
              {/* Conditionally Render Form Fields */}
              {isRegistering ? (
                <>
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
                </>
              ) : (
                <></>
              )}

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
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </form>

            {/* Toggle Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isRegistering ? (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={toggleForm}
                      className="text-blue-500 hover:underline focus:outline-none"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button
                      onClick={toggleForm}
                      className="text-blue-500 hover:underline focus:outline-none"
                    >
                      Create an account
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
