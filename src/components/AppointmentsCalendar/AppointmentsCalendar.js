// Calendar Component (shown on Calendar page and Dashboard page)
// rc\components\AppointmentsCalendar\AppointmentsCalendar.js
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import moment from 'moment';
import { fetchAllFromTable } from '../../utils/databaseOperations';

const AppointmentsCalendar = ({ defaultView }) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      // Load data from the database here and set it to the state
      const dataFromDB = await fetchAllFromTable('appointment');
      // Generate calendar events using the fetched appointments
      const calendarEvents = await setCalendarEvents(dataFromDB);
      setEvents(calendarEvents);
    })();
  }, []);

  // Create events array of appointments and followup appointments to be shown on the calendar
  const setCalendarEvents = async (appointmentsData) => {
    const events = await appointmentsData.flatMap((appointment) => {
      if (appointment.completion_status !== 'Cancelled') {
        return [
          {
            id: `appointment-${appointment.id}`,
            title: `${appointment.notes}`,
            start: new Date(appointment.date_and_time),
            end: new Date(new Date(appointment.date_and_time).getTime() + 2 * 60 * 60 * 1000),
          },
          {
            id: `followup-${appointment.id}`,
            title: `${appointment.notes} (Follow-up) ${appointment.followup_reason}`,
            start: new Date(appointment.followup_appointment),
            end: new Date(new Date(appointment.followup_appointment).getTime() + 2 * 60 * 60 * 1000),
          },
        ];
      }
      return [];
    });
    return events;
  };
    
  // Find the earliest event's start time
  let earliestEvent = events.length > 0 ? events[0] : null;
  for (let i = 1; i < events.length; i += 1) {
    if (events[i].start < earliestEvent.start) {
      earliestEvent = events[i];
    }
  }

  const calendarDefaultView = defaultView; 
  const defaultDate = earliestEvent ? earliestEvent.start : new Date();

  return (
    <>
      <Container>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={calendarDefaultView}
          defaultDate={defaultDate}
          min={new Date().setHours(5, 0, 0)}
          max={new Date().setHours(23, 59, 0)}
        />
      </Container>
    </>
  );
};

export default AppointmentsCalendar;