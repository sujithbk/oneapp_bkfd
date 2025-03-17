import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './profile.css';
import { FaCamera } from 'react-icons/fa';

function ProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [profileData, setProfileData] = useState({
    userName: '',
    name: '',
    description: '',
    links: '',
    profession: '',
    bannerImage: '',
    profileImage: ''
  });

  const [error, setError] = useState(''); // State to handle error messages
  const [isLoading, setIsLoading] = useState(true); // State to handle loading state

  // Fetch current user data when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('https://oneapp-be.onrender.com/api/v1/user/current-user', {
          withCredentials: true, // Include cookies for authentication
        });

        const { userName, name, description, links, profession, bannerImage, profileImage } = response.data;
        setProfileData({
          userName: userName || '',
          name: name || '',
          description: description || '',
          links: links ? links.join(', ') : '', // Convert array to string
          profession: profession || '',
          bannerImage: bannerImage || '',
          profileImage: profileImage || ''
        });
        setError(''); // Clear any previous errors
      } catch (err) {
        setError('You are not logged in. Please log in to edit your profile.'); // Set error message
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchCurrentUser();
  }, []);

  // Handle navigation to description page
  const navigateToDescription = () => {
    navigate('/description', { state: profileData });
  };

  // Handle navigation to links page
  const navigateToLinks = () => {
    navigate('/links', { state: profileData });
  };

  // Handle navigation to profession page
  const navigateToProfession = () => {
    navigate('/profession', { state: profileData });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle save button click
  const handleSave = () => {
    navigate('/profile', { state: profileData });
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/profile', { state: profileData });
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Display error message if user is not logged in */}
        {error && (
          <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
            {error}
          </div>
        )}

        {/* Banner Image Input */}
        <div className="mb-6 flex justify-center">
          <div className="file-input-container">
            <input
              type="file"
              className="input"
              id="bannerImage"
            />
            <label htmlFor="bannerImage" className="icon">
              <FaCamera />
            </label>
          </div>
        </div>

        {/* Profile Image Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="file"
            className="hidden"
            id="profileImage"
          />
          <label
            htmlFor="profileImage"
            className="cursor-pointer w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center border-2 border-white text-white hover:bg-gray-600 transition-colors"
          >
            <FaCamera />
          </label>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={profileData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-white rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Username Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Username
          </label>
          <input
            type="text"
            name="userName"
            placeholder="Enter your username"
            value={profileData.userName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-white rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled // Disable editing if username is fetched from API
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Description
          </label>
          <div
            onClick={navigateToDescription}
            className="cursor-pointer w-full px-4 py-2 border border-white rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {profileData.description || 'Enter a description'}
          </div>
        </div>

        {/* Link Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Links
          </label>
          <div
            onClick={navigateToLinks}
            className="cursor-pointer w-full px-4 py-2 border border-white rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {profileData.links || 'Enter links'}
          </div>
        </div>

        {/* Profession Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Profession
          </label>
          <div
            onClick={navigateToProfession}
            className="cursor-pointer w-full px-4 py-2 border border-white rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {profileData.profession || 'Enter profession'}
          </div>
        </div>

        {/* Cancel and Save Buttons */}
        <div className="flex justify-around">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;