'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import Spinner from './components/Spinner';
import { GoogleEvent } from './components/WeeklyCalendar';
import { useRouter } from 'next/navigation';
import fetchCalendarEvents from './hooks/useCalendarEvents';
import AuthenticatedHome from './components/AuthenticatedHome';
import UnauthenticatedHome from './components/UnauthenticatedHome';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [events, setEvents] = useState<GoogleEvent[]>([]);
  const [isFetchingEvents, setIsFetchingEvents] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let tokenTimer: NodeJS.Timeout;

    if (user) {
      setIsFetchingEvents(true);

      fetchCalendarEvents()
        .then((data) => {
          setEvents(data.items || []);

          const tokenExpiresIn = 3600 * 1000;
          tokenTimer = setTimeout(() => {
            alert('Your session has expired. Please log in again.');
            router.push('/api/auth/logout');
          }, tokenExpiresIn);
        })
        .catch((error) => {
          console.error('Failed to fetch calendar events:', error);
        })
        .finally(() => {
          setIsFetchingEvents(false);
        });
    }

    return () => {
      if (tokenTimer) {
        clearTimeout(tokenTimer);
      }
    };
  }, [user, router]);

  if (isLoading) return <Spinner />;

  if (isFetchingEvents) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) return <div>{error.message}</div>;

  return user ? (
    <AuthenticatedHome events={events} />
  ) : (
    <UnauthenticatedHome />
  )
}
