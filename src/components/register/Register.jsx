import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../../assets/login.jpg';
import backgroundImage from '../../assets/bg1.jpg';
import { auth, storage, db} from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

const RegisterPage = () => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name || "Upload your logo";
    document.getElementById("logo-placeholder").innerText = fileName;
    setFile(event.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Register the user with Firebase Auth
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', newUser);

      if (file) {
        // Create a reference in Firebase Storage with a safe path
        const date = new Date().getTime();
        const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_"); // Sanitize file name
        const storageRef = ref(storage, `${displayName}-${date}-${fileName}`);

        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded file:', snapshot);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        console.log('File available at:', downloadURL);
        updateProfile(newUser.user, { displayName, photoURL: downloadURL });

        setDoc(doc(db,"users",newUser.user.uid),
        {
          uid: newUser.user.uid,
          displayName : displayName,
          email : email,
          photoURL: downloadURL,
        })
        navigate('/dashboard');
        localStorage.setItem('cName', newUser.user.displayName);
        localStorage.setItem('photoURL', newUser.user.photoURL);
        // You can now store the download URL in your database or display it
      } else {
        console.log('No file selected');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-black items-center justify-center relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.2, // Adjust the opacity here
        }}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row max-w-6xl w-full bg-gray-900 bg-opacity-80 rounded-lg shadow-lg overflow-hidden">
        {/* Background Image for Small Devices */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={loginImage}
            alt="Auth Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section: Registration Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          {/* Background Image for Small Devices */}
          <img
            src={loginImage}
            alt="Auth Illustration"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-30 md:hidden"
          />
          <div className="relative max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  onChange={(e) => setDisplayName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="mb-4">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Logo Upload Input */}
              <div className="mb-6">
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div
                  id="logo-placeholder"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-500 bg-white cursor-pointer"
                  onClick={handleFileInputClick}
                >
                  Upload your logo
                </div>
                <input
                  type="file"
                  id="logo"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </button>
            </form>

            {/* Toggle Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline focus:outline-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
