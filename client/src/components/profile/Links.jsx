import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Links() {
  const navigate = useNavigate();
  const location = useLocation();
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  
  // Store the full profile data
  const [profileData, setProfileData] = useState({});
  
  // Get the full state when component loads
  useEffect(() => {
    if (location.state) {
      setProfileData(location.state);
      
      // If we have existing links data, parse it
      if (location.state.links) {
        const parts = location.state.links.split(' ');
        if (parts.length >= 1) setInput3(parts[0] || '');
        if (parts.length >= 2) setInput4(parts[1] || '');
      }
    }
  }, [location.state]);

  const handleSave = () => {
    // Create updated profile data with new links
    const updatedProfileData = {
      ...profileData,
      links: `${input3} ${input4}`.trim()
    };
    
    // Navigate back with the complete updated state
    navigate('/profile', { state: updatedProfileData });
  };

  const handleCancel = () => {
    // Navigate back with unchanged state
    navigate('/profile', { state: profileData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-700 parent-form p-8 mt-4 mb-4 rounded-lg shadow-lg w-full max-w-md">
        {/* Top Bar with Arrow Icon, Text, and Buttons */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleCancel}
            className="text-white"
          >
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">Links</h1>
        </div>

        {/* Cancel and Save Buttons */}
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-500 focus:outline-none"
          >
            Save
          </button> 
        </div>

        {/* Two Input Tags */}
        <div className="space-y-4">
          <div>
            <input
              type="url"
              placeholder="Link"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
              className="w-full px-4 py-2 border-b border-white bg-transparent text-white focus:outline-none"
            />
          </div>

          <div>
            <input
              type="url"
              placeholder="Link details"
              value={input4}
              onChange={(e) => setInput4(e.target.value)}
              className="w-full px-4 py-2 border-b border-white bg-transparent text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;