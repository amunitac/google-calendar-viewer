import WeeklyCalendar from './WeeklyCalendar';
import Navbar from './NavBar';
import { GoogleEvent } from '../types';

const AuthenticatedHome = ({ events }: { events: GoogleEvent[] }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-6 p-4">
        {events.length > 0 ? (
          <WeeklyCalendar events={events} />
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default AuthenticatedHome;