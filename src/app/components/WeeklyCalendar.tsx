'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';

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
  birthdayProperties?: object; // Propiedad para identificar cumpleaños
}

interface WeeklyCalendarProps {
  events: GoogleEvent[];
}

export default function WeeklyCalendar({ events }: WeeklyCalendarProps) {
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);

  useEffect(() => {
    if (events && events.length > 0) {
      const formattedEvents = events.map((event) => {
        const baseEvent: any = {
          title: event.summary,
          id: event.id,
        };

        if (event.recurrence || event.recurringEventId) {
          // Verificar si es un cumpleaños dentro de eventos recurrentes
          if (event.birthdayProperties) {
            baseEvent.allDay = true;
            baseEvent.start = event.start?.date || event.start?.dateTime;
            baseEvent.end = event.end?.date || event.end?.dateTime;
            baseEvent.backgroundColor = '#FBB6CE'; // Rosado para cumpleaños
          } else {
            baseEvent.start = event.start?.dateTime;
            baseEvent.end = event.end?.dateTime;
            baseEvent.backgroundColor = '#60A5FA';
          }
          baseEvent.rrule = `DTSTART:${new Date(baseEvent.start)
            .toISOString()
            .replace(/[-:]/g, '')
            .split('.')[0]}Z\n${event.recurrence ? event.recurrence[0] : ''}`;
        } else if (event.start?.date) {
          // Evento de todo el día
          baseEvent.allDay = true;
          baseEvent.start = event.start.date;
          baseEvent.end = event.end?.date;
          baseEvent.backgroundColor = '#FFDDC1'; // Anaranjado para eventos de todo el día
        } else if (event.visibility === 'private') {
          // Evento privado
          baseEvent.start = event.start?.dateTime;
          baseEvent.end = event.end?.dateTime;
          baseEvent.backgroundColor = '#FBB6CE'; // Rosado para eventos privados
        } else if (
          event.summary?.toLowerCase().includes('reunión') ||
          event.attendees
        ) {
          // Reunión
          baseEvent.start = event.start?.dateTime;
          baseEvent.end = event.end?.dateTime;
          baseEvent.backgroundColor = '#34D399'; // Verde para reuniones
        } else if (
          event.summary?.toLowerCase().includes('tarea') ||
          event.description?.toLowerCase().includes('tarea')
        ) {
          // Tarea
          baseEvent.start = event.start?.dateTime;
          baseEvent.end = event.end?.dateTime;
          baseEvent.backgroundColor = '#FACC15'; // Amarillo para tareas
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

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white overflow-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        editable={false}
        selectable={false}
        events={calendarEvents}
        height="auto"
        eventTextColor="#ffffff" // Color de texto para todos los eventos
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          list: 'Agenda',
        }}
        allDaySlot={true}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
      />
    </div>
  );
}
