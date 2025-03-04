import React from 'react'
import { useNavigate } from "react-router-dom";
import logo from './../assets/assetslogo.png'
import './landing.css'
function Landing() {
    const navigate = useNavigate();
  return (
    <div>
    <div className='parent flex flex-col items-center justify-center min-h-screen'>
        <img
            src={logo}
            alt="Landing Page"
            className='logo' 
        />

        <button onClick={() => navigate("/signup")} className="signin px-6 py-2 bg-cyan-700 rounded-3xl mb-4">
            Create New Account
        </button>

        <div className='or mt-4'>
            OR
        </div>

        <div className='mt-4'>
            Already have an account?
        </div>

        <button onClick={() => navigate("/login")} className="signin px-6 py-2 bg-cyan-700 rounded-3xl mb-4 mt-2">
            Login
        </button>

        <div className='more text-xs'>
            People who use our service may have uploaded <br/> your contact information to OneApp.
            <span className='more font-semibold'>Learn More</span>
        </div>
    </div>
</div>

  )
}

export default Landing