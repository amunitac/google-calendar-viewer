export interface GoogleEvent {
  id: string;
  summary: string;
  description?: string;
  start: { date?: string; dateTime?: string; timeZone?: string };
  end: { date?: string; dateTime?: string; timeZone?: string };
  recurrence?: string[];
  recurringEventId?: string;
  attendees?: Array<{ email: string }>;
  visibility?: string;
  birthdayProperties?: object;
  creator?: { email: string };
}

export interface WeeklyCalendarProps {
  events: GoogleEvent[];
}

export interface Event {
  title: string;
  id: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  backgroundColor: string;
  extendedProps: {
    description: string;
    recurrence: string;
    organizer: string;
    type: string;
  };
  rrule?: string;
}