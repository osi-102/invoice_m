import React from 'react';
import { useState } from 'react';
import loginImage from '../../assets/login.jpg';
import backgroundImage from '../../assets/bg1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      localStorage.setItem('cName', user.displayName);
      localStorage.setItem('photoURL', user.photoURL);
      localStorage.setItem('email', user.email);
      localStorage.setItem('uid', user.uid);
      navigate('/dashboard');
    })
    .catch((error) => {
      console.log(error.message);
    });
    // console.log(email, password);
  }
  return (
    <div
      className="flex min-h-screen bg-black items-center justify-center relative"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          opacity: 0.2 // Adjust the opacity here
        }}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl w-full bg-gray-900 bg-opacity-80 rounded-lg shadow-lg overflow-hidden">
        {/* Background Image for Small Devices */}
        <div className="hidden md:block md:w-1/2">
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
            <form onSubmit={submitHandler}>
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
                  onChange={(e) => {setEmail(e.target.value)}}
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
                  onChange={(e) => {setPassword(e.target.value)}}
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
