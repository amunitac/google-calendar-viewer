import { GoogleEvent } from '../types';

interface CalendarResponse {
  items: GoogleEvent[];
}

const fetchCalendarEvents = async (): Promise<CalendarResponse> => {
  const response = await fetch('/api/getCalendarEvents');
  if (!response.ok) {
    throw new Error(`Failed to fetch calendar events: ${response.statusText}`);
  }

  return response.json();
};

export default fetchCalendarEvents;