import { useState } from "react";
import React from 'react'
import axios from "axios";

function Sms({formData, setFormData }) {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendOtp = async () => {
    try {
      setError('');
      const response = await axios.post('http://localhost:4000/api/v1/user/send-otp', {
        email: formData.email,
      });
      
      if (response.status === 200) {
        setOtpSent(true);
        setSuccessMessage(response.data.message || 'OTP sent successfully!');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
      console.error('OTP generation error:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError('');
      const response = await axios.post('http://localhost:4000/api/v1/user/verify-otp', {
        email: formData.email,
        verificationCode: otp // Match the parameter name expected by backend
      });
      
      if (response.status === 200) {
        setSuccessMessage(response.data.message || 'OTP verified successfully!');
        // Update formData to indicate OTP is verified
        setFormData(prev => ({ ...prev, otpVerified: true }));
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP');
      console.error('OTP verification error:', error);
    }
  };

  return (
    <form>
      {/* Phone Number Input */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm headingText20 font-medium mb-2">
          Enter Your Phone Number
        </label>
        <div className="flex items-center border rounded-lg overflow-hidden w-full">
          {/* Country Code Dropdown (20% width) */}
          <select
            className="w-1.1/5 px-4 py-2 border-r focus:outline-none"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          >
            <option value="+1">+1</option>
            <option value="+44">+44 </option>
            <option value="+91">+91</option>
            <option value="+81">+81 </option>
            {/* Add more country codes as needed */}
          </select>
    
          {/* Phone Number Input (80% width) */}
          <input
            type="text"
            placeholder="Phone Number"
            className="w-4/5 px-4 py-2 focus:outline-none"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>
      </div>
    
      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm headingText20 font-medium mb-2">
          Verify Your Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
          placeholder="Enter your email address"
          value={formData.email}
          readOnly
        />
      </div>
      
      {/* OTP Input */}
      <div className="mb-4">
        <label htmlFor="otp" className="block text-sm font-medium mb-2">
          Verification Code
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
          placeholder="XXXXXX"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <p className="text-xs mt-1">
          Please enter the verification code sent to your email.
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 text-green-500 text-sm">{successMessage}</div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {/* Send OTP Button */}
        <button
          type="button"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleSendOtp}
        >
          {otpSent ? "Resend OTP" : "Send OTP"}
        </button>

        {/* Verify OTP Button */}
        {otpSent && (
          <button
            type="button"
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            onClick={handleVerifyOtp}
            disabled={!otp || otp.length < 6}
          >
            Verify OTP
          </button>
        )}
      </div>
    </form>
  );
}

export default Sms;












//  {/* OTP Input */}
//  <div className="mb-4">
//  <label htmlFor="otp" className="block text-sm font-medium mb-2">
//    Verification Code
//  </label>
//  <input
//    type="text"
//    className="w-full px-3 py-2 border rounded-md focus:outline-none"
//    placeholder="XXXXXX"
//    maxLength={6}
//  />
//  <p className="text-xs mt-1">
//    Please enter the verification code.
//  </p>
// </div>

// {/* Send OTP Button */}
// <button
//  type="button"
//  className="px-6 py-2 rounded-3xl mb-4"
// >
//  Send OTP
// </button>

// {/* Verify OTP Button */}
// <button
//  type="button"
//  className="px-6 py-2 rounded-3xl"
// >
//  Verify OTP
// </button>