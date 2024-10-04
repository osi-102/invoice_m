import React, { useState, useRef, useEffect } from "react";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db, auth, storage } from "../../firebase"; // Ensure Firebase is set up correctly
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Setting = () => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem("photoURL") || auth.currentUser?.photoURL
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(""); // For verifying old password
  const [file, setFile] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false); // Hide password fields initially
  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false); // Track if old password is verified

  useEffect(() => {
    // Set initial values from localStorage
    setDisplayName(localStorage.getItem("displayName") || auth.currentUser?.displayName || "");
    setEmail(localStorage.getItem("email") || auth.currentUser?.email || "");
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      // Update profile picture if a new file is selected
      let downloadURL = imageUrl; // Default to the current image URL
      if (file) {
        const storageRef = ref(storage, `profilePhotos/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, file);
        downloadURL = await getDownloadURL(storageRef); // Get the new download URL
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
        setImageUrl(downloadURL);
        localStorage.setItem("photoURL", downloadURL);
      }

      // Update Firestore with the new photoURL and displayName
      const userDoc = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDoc, { photoURL: downloadURL, displayName });

      // Update email if it's changed
      if (email !== auth.currentUser.email) {
        // Re-authenticate before changing the email
        await updateEmail(auth.currentUser, email);
        localStorage.setItem("email", email); // Update localStorage

        // Send verification email after updating email
        await auth.currentUser.sendEmailVerification();
        alert("A verification email has been sent to your new email address.");
      }

      // Re-authenticate and change password if old password is verified
      if (isOldPasswordVerified && password && password === confirmPassword) {
        await updatePassword(auth.currentUser, password);
      } else if (password !== confirmPassword) {
        alert("Passwords do not match");
      }

      // Update contact and address in Firestore
      await updateDoc(userDoc, { contact, address });

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleOldPasswordVerification = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential); // Verify the old password
      setIsOldPasswordVerified(true);
      setShowPasswordFields(true); // Show password fields when the old password is verified
    } catch (error) {
      alert("Old password is incorrect. Please try again.");
      setIsOldPasswordVerified(false); // Reset if the password is incorrect
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700">Settings</h1>
      <form onSubmit={handleProfileUpdate} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-6">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={imageUrl || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => fileInputRef.current.click()}
            >
              Upload New Photo
            </button>
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-700"
          >
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            placeholder={localStorage.getItem("displayName") || "Current Display Name"}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder={localStorage.getItem("email") || "Current Email Address"}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Contact */}
        <div>
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            Contact
          </label>
          <input
            id="contact"
            type="text"
            value={contact}
            placeholder="Enter your contact"
            onChange={(e) => setContact(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            placeholder="Enter your address"
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {!isOldPasswordVerified && (
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleOldPasswordVerification}
            >
              Verify Old Password
            </button>
          )}
        </div>

        {showPasswordFields && (
          <>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Setting;
