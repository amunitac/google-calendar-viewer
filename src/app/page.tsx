'use client'

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [events, setEvents] = useState<any>(null);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      if (user) {
        try {
          const response = await fetch('/api/getCalendarEvents');

          if (response.ok) {
            const data = await response.json();
            console.log('Calendar Events:', data);
            setEvents(data.items || []);
          } 
        } catch (error) {
          console.error('Failed to fetch calendar events:', error);
        }
      }
    };

    if (user) {
      fetchCalendarEvents();
    }

  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome {user.name}</h1>
          <a href="/api/auth/logout">Logout</a>
          <h2>Your Calendar Events:</h2>
          {events ? (
            <ul>
              {events.map((event: any, index: number) => (
                <li key={index}>
                  <strong>{event.summary}</strong> - {event.start?.dateTime || event.start?.date}
                </li>
              ))}
            </ul>
          ) : (
            <div>Loading...</div>
          )}
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  )
}