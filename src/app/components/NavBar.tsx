'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { FiLogIn, FiSearch, FiMenu, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Navbar({ toggleSideBar, currentDate, navigateWeek }: { toggleSideBar: () => void, currentDate: Date, navigateWeek: (direction: 'prev' | 'next') => void }) {
  const { user } = useUser();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(currentDate);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white shadow-md">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSideBar}
          className="p-2 rounded hover:bg-gray-700 focus:outline-none"
        >
          <FiMenu size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <Image 
            src="/logo.png"
            alt="App Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-xl font-semibold">My Planner</span>
        </div>
      </div>

      {user && (
        <div className="hidden sm:flex items-center space-x-4">
          <button onClick={() => navigateWeek('prev')} className="p-2 rounded hover:bg-gray-700 focus:outline-none">
            <FiChevronLeft size={20} />
          </button>
          <button onClick={() => navigateWeek('next')} className="p-2 rounded hover:bg-gray-700 focus:outline-none">
            <FiChevronRight size={20} />
          </button>
          <span className="text-lg font-medium">{getFormattedDate()}</span>
        </div>
      )}

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="relative">
              <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="p-2 rounded hover:bg-gray-700 focus:outline-none"
              >
                <FiSearch size={20} />
              </button>
              {isSearchActive && (
                <input
                  type="text"
                  placeholder="Search tasks and events..."
                  className="absolute top-full left-0 mt-2 px-4 py-2 w-64 bg-gray-700 rounded-md focus:outline-none"
                />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src={user.picture || '/placeholder.jpg'}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{user.name}</span>
              <a href="/api/auth/logout" className="hover:text-gray-300">
                <FiLogOut size={20} />
              </a>
            </div>
          </>
        ) : (
          <a href="/api/auth/login" className="flex items-center hover:text-gray-300 space-x-1">
            <p>LogIn</p>
            <FiLogIn size={20} className="mr-1" />
          </a>
        )}
      </div>
    </nav>
  );
}
