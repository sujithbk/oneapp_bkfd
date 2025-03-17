import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaUser, FaPlus, FaComment, FaBookmark, FaBars, FaHome, FaEnvelope } from 'react-icons/fa';
import { BsCardImage } from 'react-icons/bs';
import { MdOutlineEdit } from 'react-icons/md';
import { IoSettingsOutline, IoHelpCircleOutline } from 'react-icons/io5';
import { TfiThought } from "react-icons/tfi";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import './home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [activeTab, setActiveTab] = useState('foryou');
  const [thoughtText, setThoughtText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex bg-black text-white min-h-screen w-full">
      {isMobile ? (
        // Mobile View
        <div className="mobile-view w-full">
          {/* Mobile Sidebar */}
          <div 
            className={`fixed top-0 left-0 h-full bg-black w-64 p-4 transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out z-50`}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">OneApp Menu</h1>
              <button onClick={toggleSidebar}>
                <FaPlus className="rotate-45" size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-2 p-3">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                <TfiThought size={18} />
                </div>
                <span className=" smallfornt mt-1">Thoughts</span>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                  <MdOutlineMailOutline  size={18} />
                </div>
                <span className=" smallfornt mt-1">Messages</span>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                  <CiBookmark size={18} />
                </div>
                <span className=" smallfornt mt-1">Saved</span>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                  <FaUserEdit onClick={ ()=>{ navigate ('/profile')}} size={18} />
                </div>
                <span className=" smallfornt mt-1">Edit</span>
              </div>
            </div>
          </div>
          
          {/* Overlay to close sidebar */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={toggleSidebar}
            ></div>
          )}
          
          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Mobile Top Navigation */}
            <div className="border-b border-gray-800 p-3 flex justify-between items-center sticky top-0 bg-black z-10">
              <div className="flex items-center space-x-3">
                <button onClick={toggleSidebar}>
                  <FaBars size={20} />
                </button>
                <h2 className="font-bold text-xl">OneApp</h2>
              </div>
              
              <button className="p-2">
                <FaSearch size={20} />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              <button 
                className={`flex-1 py-3 text-center font-medium ${activeTab === 'foryou' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('foryou')}
              >
                For you
              </button>
              <button 
                className={`flex-1 py-3 text-center font-medium ${activeTab === 'following' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('following')}
              >
                Following
              </button>
            </div>
            
            {/* Feed */}
            <div className="pb-20">
              {/* Sample post 1 */}
              <div className="border-b border-gray-800 p-4">
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold">Username</span>
                        <span className="text-gray-500 ml-1">@handle</span>
                      </div>
                      <span className="text-gray-500">2h</span>
                    </div>
                    <p className="mt-2">This is a sample post for the OneApp mobile interface.</p>
                    <div className="flex justify-between text-gray-500 mt-4">
                      <button><FaComment size={16} /></button>
                      <button><FaPlus size={16} /></button>
                      <button><CiBookmark size={16} /></button>
                      <button><FaUser size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sample post 2 */}
              <div className="border-b border-gray-800 p-4">
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold">Another User</span>
                        <span className="text-gray-500 ml-1">@another</span>
                      </div>
                      <span className="text-gray-500">5h</span>
                    </div>
                    <p className="mt-2">Here's another sample post with some content.</p>
                    <div className="flex justify-between text-gray-500 mt-4">
                      <button><FaComment size={16} /></button>
                      <button><FaPlus size={16} /></button>
                      <button><CiBookmark size={16} /></button>
                      <button><FaUser size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Bottom Navigation - Fixed */}
          <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 flex justify-between items-center p-3 z-30">
            <button className="flex flex-col items-center">
              <FaHome size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
            
            <button className="flex flex-col items-center">
              <FaSearch size={20} />
              <span className="text-xs mt-1">Search</span>
            </button>
            
            <button className="flex flex-col items-center">
              <FaBell size={20} />
              <span className="text-xs mt-1">Alerts</span>
            </button>
            
            <button className="flex flex-col items-center">
              <MdOutlineMailOutline  size={20} />
              <span className="text-xs mt-1">Messages</span>
            </button>
            
            <button className="flex flex-col items-center">
              <FaUser size={20} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
          
          {/* Mobile Compose Button */}
          <div className="fixed right-4 bottom-20 z-30">
            <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
              <FaPlus size={24} />
            </button>
          </div>
        </div>
      ) : (
        // Desktop View
        <div className="flex bg-black text-white min-h-screen w-full">
          {/* Left Sidebar */}
          <div className="w-80 border-r border-gray-800 hidden md:block">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center">
                
                <h1 className="text-xl font-bold">OneApp</h1>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 p-3">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                <TfiThought size={18} />
                </div>
                <span className="text-xs mt-1">Thoughts</span>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                  <MdOutlineMailOutline  size={18} />
                </div>
                <span className="text-xs mt-1">Messages</span>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                  <CiBookmark size={18} />
                </div>
                <span className="text-xs mt-1">Saved</span>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                  <FaUserEdit onClick={ ()=>{ navigate ('/profile')}} size={18} />
                </div>
                <span className="text-xs mt-1">Edit</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4  p-4">
              <div className="flex flex-col items-center justify-center  ">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                  <IoSettingsOutline size={18} />
                </div>
                <span className="text-xs mt-1">Settings</span>
              </div>
              
              <div className="flex flex-col items-center justify-center ">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-gray-700">
                  <IoHelpCircleOutline size={20} />
                </div>
                <span className="text-xs mt-1">Help</span>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 border-r border-gray-800">
            {/* Top Navigation */}
            <div className="border-b border-gray-800 p-3 flex justify-between items-center sticky top-0 bg-black z-10">
              <h2 className="font-bold text-xl md:hidden">OneApp</h2>
              <div className="relative flex-1 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search OneApp!"
                  className="bg-gray-900 text-white w-full rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
                            
              <div className="flex items-center space-x-4">
                <button className="p-2">
                  <FaPlus size={20} />
                </button>
                <button className="p-2">
                  <FaBell size={20} />
                </button>
                <button className="p-2">
                  <FaUser size={20} />
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              <button 
                className={`flex-1 py-3 text-center font-medium ${activeTab === 'foryou' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('foryou')}
              >
                For you
              </button>
              <button 
                className={`flex-1 py-3 text-center font-medium ${activeTab === 'following' ? 'border-b-2 border-blue-500' : ''}`}
                onClick={() => setActiveTab('following')}
              >
                Following
              </button>
            </div>
            
            {/* Feed */}
            {/* Add your feed content here */}
          </div>
          
          {/* Right Sidebar (Compose) */}
          <div className="w-80 hidden lg:block p-4">
            <div className="bg-black rounded-xl p-4 border border-gray-800">
              <textarea
                placeholder="Write your Thoughts!"
                className="w-full bg-transparent border-none outline-none resize-none h-24"
                value={thoughtText}
                onChange={(e) => setThoughtText(e.target.value)}
              />
              
              <div className="flex justify-between items-center mt-4">
                <button className="text-blue-500">
                  <BsCardImage size={20} />
                </button>
                <button 
                  className="bg-white text-black px-4 py-1 rounded-md font-medium"
                  disabled={!thoughtText.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;