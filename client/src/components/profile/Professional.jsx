import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Professional() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'DevOps Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile App Developer',
    'Cloud Architect',
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredSuggestions = options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    setSearchQuery(value);
    setSelectedValue(value);
    setSuggestions([]);
  };

  const handleSave = () => {
    const updatedProfileData = {
      ...location.state,
      profession: selectedValue
    };
    navigate('/profile', { state: updatedProfileData });
  };

  const handleCancel = () => {
    navigate('/profile', { state: location.state });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleCancel}
            className="text-white"
          >
            <FaArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-bold">Profession</h1>
        </div>

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

        <div className="relative">
          <input
            type="text"
            placeholder="Search for a profession..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-white rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-gray-700 border border-white rounded-lg shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 cursor-pointer text-white hover:bg-gray-600"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedValue && (
          <div className="mt-6">
            <p className="text-white">
              Selected Profession: <span className="font-bold">{selectedValue}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Professional;