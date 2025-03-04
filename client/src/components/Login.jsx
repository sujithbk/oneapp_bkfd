import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        identifier: '',
        password: '',
        general: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const loginSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({ identifier: '', password: '', general: '' });
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/api/v1/user/login', formData);

            if (response.status === 200) {
                // Store token and user data
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/home');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data.message === "Invalid credentials") {
                    setErrors({
                        identifier: 'Invalid email or username',
                        password: 'Invalid password'
                    });
                } else {
                    setErrors({
                        general: 'An error occurred. Please try again.'
                    });
                }
            } else if (error.request) {
                setErrors({
                    general: 'Server is not responding. Please try again later.'
                });
            } else {
                setErrors({
                    general: 'An unexpected error occurred.'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <div className="parent flex flex-col items-center justify-center min-h-screen">
                <div className="children p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center headingText1">
                        Welcome to OneApp
                    </h1>
                    <h1 className="text-center mb-6">Login your account</h1>
                    {errors.general && (
                        <p className="text-red-500 text-sm mb-4 text-center">{errors.general}</p>
                    )}
                    <form onSubmit={loginSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium formText mb-2">
                                Email or username
                            </label>
                            <input
                                type="text"
                                name="identifier"
                                className="mt-1 block w-full px-3 py-2 border rounded-md formplaceholder focus:outline-none"
                                placeholder="Enter your email or username"
                                value={formData.identifier}
                                onChange={handleChange}
                                required
                            />
                            {errors.identifier && (
                                <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium formText mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="mt-1 block w-full px-3 py-2 border rounded-md formplaceholder focus:outline-none"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <div className="flex justify-between loginbtn">
                            <button
                                onClick={() => navigate("/")}
                                type="button"
                                className="px-4 py-2 text-white btnlast"
                                disabled={loading}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white btnlast"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Finish'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;