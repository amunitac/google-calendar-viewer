'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface GoogleEvent {
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

interface WeeklyCalendarProps {
  events: GoogleEvent[];
}

export default function WeeklyCalendar({ events }: WeeklyCalendarProps) {
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    if (events && events.length > 0) {
      const formattedEvents = events.map((event) => {
        const baseEvent: any = {
          title: event.summary,
          id: event.id,
          extendedProps: {
            description: event.description || 'Sin descripción',
            recurrence: event.recurrence ? event.recurrence.join(', ') : 'No recurrente',
            organizer: event.creator ? event.creator?.email || 'Desconocido' : 'Desconocido',
            type: 'other', // Tipo inicial por defecto
          },
        };

        if (event.recurrence || event.recurringEventId) {
          if (event.birthdayProperties) {
            baseEvent.allDay = true;
            baseEvent.start = event.start?.date || event.start?.dateTime;
            baseEvent.end = event.end?.date || event.end?.dateTime;
            baseEvent.backgroundColor = '#FBB6CE'; // Rosado para cumpleaños
            baseEvent.extendedProps.type = 'birthday';
          } else {
            baseEvent.start = event.start?.dateTime;
            baseEvent.end = event.end?.dateTime;
            baseEvent.backgroundColor = '#60A5FA';
            baseEvent.extendedProps.type = 'recurring';
          }
          baseEvent.rrule = `DTSTART:${new Date(baseEvent.start)
            .toISOString()
            .replace(/[-:]/g, '')
            .split('.')[0]}Z\n${event.recurrence ? event.recurrence[0] : ''}`;
        } else if (event.start?.date) {
          baseEvent.allDay = true;
          baseEvent.start = event.start.date;
          baseEvent.end = event.end?.date;
          baseEvent.backgroundColor = '#FFDDC1'; // Anaranjado para eventos de todo el día
          baseEvent.extendedProps.type = 'allDay';
        } else if (event.visibility === 'private') {
          // Evento privado
          baseEvent.start = event.start?.dateTime;
          baseEvent.end = event.end?.dateTime;
          baseEvent.backgroundColor = '#FBB6CE'; // Rosado para eventos privados
          baseEvent.extendedProps.type = 'private';
        } else if (
          event.summary?.toLowerCase().includes('reunión') ||
          event.attendees
        ) {
          // Reunión
          baseEvent.start = event.start?.dateTime;
          baseEvent.end = event.end?.dateTime;
          baseEvent.backgroundColor = '#34D399'; // Verde para reuniones
          baseEvent.extendedProps.type = 'meeting';
        } else if (
          event.summary?.toLowerCase().includes('tarea') ||
          event.description?.toLowerCase().includes('tarea')
        ) {
          // Tarea
          baseEvent.start = event.start?.dateTime;
          baseEvent.end = event.end?.dateTime;
          baseEvent.backgroundColor = '#FACC15'; // Amarillo para tareas
          baseEvent.extendedProps.type = 'task';
        } else {
          // Otros eventos
          baseEvent.start = event.start?.dateTime;
          baseEvent.end = event.end?.dateTime;
          baseEvent.backgroundColor = '#A78BFA'; // Morado para otros eventos
        }

        return baseEvent;
      });

      setCalendarEvents(formattedEvents);
    }
  }, [events]);

  const renderEventContent = (arg: any) => {
    const { extendedProps } = arg.event;

    return (
      <Tippy
        content={
          <div className="text-sm transition-transform transform scale-95 hover:scale-100">
            <p><strong>Título:</strong> {arg.event.title}</p>
            <p><strong>Hora:</strong> {arg.event.start?.toLocaleTimeString()}</p>
            <p><strong>Descripción:</strong> {extendedProps.description}</p>
            <p><strong>Organizador:</strong> {extendedProps.organizer}</p>
          </div>
        }
        placement='top'
        arrow={true}
        animation='fade'
        duration={200}
      >
        <div className="transition-transform transform hover:scale-105 p-2 rounded-lg text-ellipsis overflow-hidden whitespace-nowrap">
          {arg.event.title}
        </div>
      </Tippy>
    )
  }

  const filteredEvents = calendarEvents.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.extendedProps.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter ? event.extendedProps.type === filter : true;
    return matchesSearch && matchesFilter;
  })

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white overflow-auto">
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search events..."
          className="border border-gray-300 rounded-md p-2 flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md p-2"
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value || null)}
        >
          <option value="">All</option>
          <option value="birthday">Birthday</option>
          <option value="recurring">Recurring</option>
          <option value="allDay">All Day</option>
          <option value="meeting">Meetings</option>
          <option value="task">Tasks</option>
          <option value="other">Others</option>
        </select>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        editable={false}
        selectable={false}
        events={filteredEvents}
        eventContent={renderEventContent}
        height="auto"
        eventTextColor="#ffffff"
        buttonText={{
          today: 'Today',
          day: 'Day'
        }}
        allDaySlot={true}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        dayCellClassNames={(date) =>
          date.isToday
            ? 'bg-blue-100 border-blue-500 hover:bg-blue-200'
            : 'hover:bg-gray-100'
        }
        titleFormat={{ year: 'numeric', month: 'long' }}
      />
    </div>
  );
}
