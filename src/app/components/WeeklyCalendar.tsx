'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { WeeklyCalendarProps } from '../types';
import { formatGoogleEvents, useFilteredEvents } from '../utils/eventUtils';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

export default function WeeklyCalendar({ events }: WeeklyCalendarProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filter, setFilter] = useState<string | null>(null);

  const formattedEvents = formatGoogleEvents(events);
  const filteredEvents = useFilteredEvents(formattedEvents, searchQuery, filter);

  const renderEventContent = (arg: any) => {
    const { extendedProps } = arg.event;

    return (
      <Tippy
        content={
          <div className="text-sm transition-transform transform scale-95 hover:scale-100">
            <p><strong>Title:</strong> {arg.event.title}</p>
            <p><strong>Time:</strong> {arg.event.start?.toLocaleTimeString()}</p>
            <p><strong>Description:</strong> {extendedProps.description}</p>
            <p><strong>Organizer:</strong> {extendedProps.organizer}</p>
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

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white overflow-auto">
      <div className="flex items-center space-x-4 mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterDropdown value={filter} onChange={setFilter} />
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
