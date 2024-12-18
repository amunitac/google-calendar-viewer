'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import Navbar from './components/NavBar';
import Spinner from './components/Spinner';
import WeeklyCalendar from './components/WeeklyCalendar';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [events, setEvents] = useState<any[]>([]);
  const [isFetchingEvents, setIsFetchingEvents] = useState<boolean>(false);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      if (user) {
        setIsFetchingEvents(true);
        try {
          const response = await fetch('/api/getCalendarEvents');

          if (response.ok) {
            const data = await response.json();
            console.log('Calendar Events:', data);
            setEvents(data.items || []);
          } else {
            console.error('Failed to fetch calendar events:', response.statusText);
          }
        } catch (error) {
          console.error('Failed to fetch calendar events:', error);
        } finally {
          setIsFetchingEvents(false);
        }
      }
    };

    if (user) {
      fetchCalendarEvents();
    }

  }, [user]);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-6 p-4">
        <h1 className="text-2xl font-bold mb-4">Hola, {user?.name}</h1>
        {events.length > 0 ? (
          <WeeklyCalendar events={events} />
        ) : (
          <p>No hay eventos disponibles.</p>
        )}
      </div>
    </div>
  )
}