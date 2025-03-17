import React, { useState } from 'react';
import { Search, Home, Bell, User, Menu, Settings, MessageCircle, Plus } from 'lucide-react';

function HomeNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative min-h-screen">
            {/* Top Navbar */}
            <nav className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
                {/* Logo or Toggle Button */}
                <div>
                    <button 
                        className="md:hidden" 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu size={28} />
                    </button>
                    <div className="hidden md:block text-xl font-bold">LOGO</div>
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-4">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none"
                    />
                </div>

                {/* Icons on Desktop */}
                <div className="hidden md:flex space-x-4">
                    <Home />
                    <Bell />
                    <User />
                </div>

                {/* Icons on Mobile View */}
                {isOpen && (
                    <div className="absolute top-14 left-4 bg-blue-500 p-2 rounded-lg shadow-lg flex space-x-4 md:hidden">
                        <Home />
                        <Bell />
                        <User />
                        <Settings />
                    </div>
                )}
            </nav>

            {/* Bottom Navbar for Mobile */}
            <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white flex justify-around py-2 z-50 md:hidden">
                <Home />
                <Bell />
                <Plus />
                <MessageCircle />
                <User />
            </div>
        </div>
    );
}

export default HomeNav;
