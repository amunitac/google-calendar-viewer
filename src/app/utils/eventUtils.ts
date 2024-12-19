import { GoogleEvent, Event } from "../types";

export const formatGoogleEvents = (events: GoogleEvent[]): Event[] => {
  return events.map((event) => {
    const type = getEventType(event);
    const backgroundColor = getEventBackgroundColor(type);
    const start = event.start?.date || event.start?.dateTime;
    const end = event.end?.date || event.end?.dateTime;
    const allDay = type === 'allDay' || type === 'birthday';

    return {
      title: event.summary,
      id: event.id,
      start,
      end,
      allDay,
      backgroundColor,
      extendedProps: {
        description: event.description || 'No description',
        recurrence: event.recurrence ? event.recurrence.join(', ') : 'Not recurring',
        organizer: event.creator ? event.creator?.email || 'Unknown' : 'Unknown',
        type,
      },
      rrule: type === 'recurring' && start ? formatRRule(start, event.recurrence) : undefined,
    }
  })
}

const getEventType = (event: GoogleEvent): string => {
  if (event.recurrence || event.recurringEventId) {
    return event.birthdayProperties ? 'birthday' : 'recurring';
  }
  if (event.start?.date) return 'allDay';
  if (event.visibility === 'private') return 'private';
  if (event.attendees) return 'meeting';
  if (
    event.summary?.toLowerCase().includes('tarea') ||
    event.description?.toLowerCase().includes('tarea')
  ) {
    return 'task';
  }
  return 'other';
}

const getEventBackgroundColor = (type: string): string => {
  const colors: Record<string, string> = {
    birthday: '#FBB6CE',
    recurring: '#60A5FA',
    allDay: '#FFDDC1',
    private: '#FBB6CE',
    meeting: '#34D399',
    task: '#FACC15',
    other: '#A78BFA',
  };

  return colors[type] || '#A78BFA';
}

const formatRRule = (startDate: string, recurrence: string[] | undefined): string | undefined => {
  if (!recurrence) return undefined;

  const formattedStart = new Date(startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return `DTSTART:${formattedStart}\n${recurrence[0]}`; 
}

export const useFilteredEvents = (events: Event[], searchQuery: string, filter: string | null) => {
  return events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.extendedProps.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter ? event.extendedProps.type === filter : true;
    return matchesSearch && matchesFilter;
  });
}