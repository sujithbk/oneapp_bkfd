
import React, { useState } from 'react';
import Signup from './Signup';
import Sms from './Sms';
import UserName from './UserName';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Make sure to import toast

function Form() {
  const navigate = useNavigate();
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    dateOfBirth: "", 
    userName: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const subHeader = ['Create account', 'SMS verification', 'Username!'];
  const steps = ['Step 1 of 3', 'Step 2 of 3', 'Step 3 of 3'];

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    dateOfBirth: '',
    country: '',
    phoneNumber: '',
    otp: '',
    userName: '',
  });

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: "Invalid email format" }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, email: "" }));
      return true;
    }
  };

  // Password validation
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors(prev => ({ ...prev, password: "Password must be at least 8 characters long, contain a number, and an uppercase letter" }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, password: "" }));
      return true;
    }
  };

  // dateOfBirth validation
  const validateDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) {
      setErrors(prev => ({ ...prev, dateOfBirth: "Date of birth is required" }));
      return false;
    } else {
      setErrors(prev => ({ ...prev, dateOfBirth: "" }));
      return true;
    }
  };

  // Check if email exists
  const checkEmailExists = async (email) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/v1/user/check-email', { email });
      return false; // Email is available
    } catch (error) {
      // If the status is 400, we know the email already exists
      if (error.response && error.response.status === 400) {
        setErrors(prev => ({ ...prev, email: "Email already registered" }));
        return true; // Email exists
      }
      console.error('Error checking email:', error);
      // Handle other errors
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if username exists
  const checkUsername = async (username) => {
    if (!username || username.trim() === '') {
      setErrors(prev => ({ ...prev, userName: "Username is required" }));
      setUsernameValid(false);
      return false;
    }
    
    try {
      setIsChecking(true);
      const response = await axios.post('http://localhost:4000/api/v1/user/check-username', { userName: username });
      // If we reach here, username is available
      setErrors(prev => ({ ...prev, userName: "" }));
      setUsernameValid(true);
      return true; // Username is valid
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(prev => ({ ...prev, userName: "Username already taken!" }));
        setUsernameValid(false);
        return false; // Username is invalid
      } else {
        console.error('Error checking username:', error);
        setErrors(prev => ({ ...prev, userName: "Error checking username" }));
        setUsernameValid(false);
        return false; // Username check failed
      }
    } finally {
      setIsChecking(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate fields on change
    if (name === "email") {
      validateEmail(value);
    } else if (name === "password") {
      validatePassword(value);
    } else if (name === "dateOfBirth") {
      validateDateOfBirth(value);
    }
    
    // Check overall form validity
    const isEmailValid = validateEmail(name === "email" ? value : formData.email);
    const isPasswordValid = validatePassword(name === "password" ? value : formData.password);
    const isDateOfBirthValid = validateDateOfBirth(name === "dateOfBirth" ? value : formData.dateOfBirth);
   
    setIsFormValid(isEmailValid && isPasswordValid && isDateOfBirthValid);
  };

  // Handle next button click
  const handleNext = async () => {
    if (pages === 0) {
      try {
        setLoading(true);
        const emailExists = await checkEmailExists(formData.email);
        if (emailExists) {
          // The error is already set in the checkEmailExists function
          return; // Don't proceed to next page
        }
        if (isFormValid) {
          setPages(pages + 1);
        }
      } catch (error) {
        toast.error('Error proceeding to next step. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setPages(pages + 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate username first
    if (!formData.userName || formData.userName.trim() === '') {
      setErrors(prev => ({ ...prev, userName: "Username is required" }));
      return;
    }
    
    // Prepare data for submission
    const { email, password, dateOfBirth, userName, country, phoneNumber } = formData;

    try {
      setLoading(true);
      
      // First check if the username is available
      await checkUsername(userName);
      
      if (!usernameValid) {
        toast.error('Username is not valid or already taken');
        return;
      }
      
      // Proceed with user creation
      const response = await axios.post('http://localhost:4000/api/v1/user/create-user', {
        email,
        password,
        dateOfBirth,
        userName,
        country: country || '',
        phoneNumber: phoneNumber || ''
      });

      // Even if there's a status 500 error, but the data is saved,
      // we should handle it gracefully
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      
      // If data was saved despite the error (as you mentioned)
      if (error.response && error.response.status === 500) {
        // Check if user was actually created
        try {
          const checkEmail = await axios.post('http://localhost:4000/api/v1/user/check-email', { email });
          // If this doesn't throw an error with status 400, the user wasn't created
          toast.error('Registration failed. Please try again.');
        } catch (innerError) {
          if (innerError.response && innerError.response.status === 400) {
            // User was created despite the 500 error
            toast.success('Your account was created successfully!');
            navigate('/login');
          } else {
            toast.error('Registration failed. Please try again.');
          }
        }
      } else {
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Render form based on current page
  const FormBody = () => {
    if (pages === 0) {
      return <Signup 
        formData={formData} 
        setFormData={setFormData} 
        handleInputChange={handleInputChange} 
        errors={errors} 
      />;
    } else if (pages === 1) {
      return <Sms 
        formData={formData} 
        setFormData={setFormData} 
      />;
    } else {
      return <UserName 
        formData={formData} 
        setFormData={setFormData} 
        checkUsername={checkUsername}
        errors={errors}
      />;
    }
  };

  return (
    <div className="">
      <div className="parent flex flex-col items-center justify-center min-h-screen">
        <div className="children p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center headingText1">
            Welcome to OneApp
          </h1>
          <h1 className="headingText2">{subHeader[pages]}</h1>
          <h1 className="headingText3 mt-2 mb-2">{steps[pages]}</h1>
          
          {FormBody()}
          
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 btnlast"
              onClick={() => {
                if (pages === 0) {
                  navigate('/');
                } else {
                  setPages(pages - 1);
                }
              }}
              disabled={loading}
            >
              Back
            </button>
            
            <button
              type="submit"
              className={`px-4 py-2 btnlast ${(pages === 2 && errors.userName) || (!isFormValid && pages === 0) || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={(pages === 2 && errors.userName) || (!isFormValid && pages === 0) || loading}
              onClick={async (e) => {
                if (pages === subHeader.length - 1) {
                  await handleSubmit(e);
                } else {
                  await handleNext();
                }
              }}
            >
              {loading ? 'Processing...' : pages === subHeader.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;