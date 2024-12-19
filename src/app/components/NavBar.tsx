'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import React from 'react';

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white shadow-md">
      <div className="flex items-center space-x-4">
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

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              <Image
                src={user.picture || ''}
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
            <p>LogIn with Google</p>
            <FiLogIn size={20} className="mr-1" />
          </a>
        )}
      </div>
    </nav>
  );
}
