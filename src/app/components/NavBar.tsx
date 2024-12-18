'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { FiLogIn, FiLogOut, FiUserPlus, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-lg">
      <div className="text-xl font-bold flex items-center">
      <FiCalendar className="h-8 w-8 mr-2 text-indigo-500" />
        MiCalendario
      </div>
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <a href="/api/auth/login" className="flex items-center hover:text-gray-300">
              <FiLogIn className="h-5 w-5 mr-1" />
              Login
            </a>
            <a href="/api/auth/signup" className="flex items-center hover:text-gray-300">
              <FiUserPlus className="h-5 w-5 mr-1" />
              Sign Up
            </a>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <Image
                src={user.picture || '/placeholder.jpg'}
                alt="User"
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
              />
              <span className="hidden sm:block">{user.name}</span>
            </div>
            <a href="/api/auth/logout" className="flex items-center hover:text-gray-300">
              <FiLogOut className="h-5 w-5 mr-1" />
              Logout
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
