
import React from 'react';

function Signup({formData, setFormData, handleInputChange, errors}) {
  return (
    <form>
      <div className="mb-4">
        <label className="block text-sm font-medium formText mb-2">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border rounded-md formplaceholder focus:outline-none"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="mt-1 block w-full px-3 py-2 border rounded-md formplaceholder focus:outline-none"
          placeholder="Choose your password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium">
          Your birth date
        </label>
        <input
          type="date"
          name="dateOfBirth"
          className="mt-1 block w-full px-3 py-2 border rounded-md formplaceholder focus:outline-none"
          placeholder="DD/MM/YYYY"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
        {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
      </div>
      
      <h1 className="mb-2 terms">
        By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
      </h1>
    </form>
  );
}

export default Signup;