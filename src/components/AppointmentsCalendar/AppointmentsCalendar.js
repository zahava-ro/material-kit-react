import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Iconify from '../iconify';
import AddAppointmentModal from '../AddAppointment/AddAppointmentModal';
import './Calendar.css';

const dummyAppointments = [
    {
      id: 1,
      customer_id: 1,
      location_id: 101,
      date_and_time: '2023-07-30 09:00:00',
      service_group_id: 201,
      employee_group_id: 301,
      cost: 150.0,
      completion_status: 'Completed',
      payment_status: 'Paid',
      frequency_in_days: 30,
      followup_appointment: '2023-08-25 09:00:00',
      followup_reason: 'Regular checkup',
      notes: 'Performed pest control service at customer location.',
    },
    {
      id: 2,
      customer_id: 2,
      location_id: 102,
      date_and_time: '2023-08-01 10:30:00',
      service_group_id: 202,
      employee_group_id: 302,
      cost: 180.0,
      completion_status: 'Completed',
      payment_status: 'Unpaid',
      frequency_in_days: 60,
      followup_appointment: '2023-09-25 10:30:00',
      followup_reason: 'Special treatment required',
      notes: 'Upcoming appointment for pest inspection.',
    },
    {
      id: 3,
      customer_id: 3,
      location_id: 103,
      date_and_time: '2023-08-03 21:00:00',
      service_group_id: 203,
      employee_group_id: 303,
      cost: 200.0,
      completion_status: 'In Progress',
      payment_status: 'Unpaid',
      frequency_in_days: 90,
      followup_appointment: '2023-10-25 13:45:00',
      followup_reason: 'Large-scale pest treatment',
      notes: 'Ongoing pest eradication service.',
    },
    // Add more dummy appointments here...
  ];

const localizer = momentLocalizer(moment);

const AppointmentsCalendar = ({ defaultView }) => {
  const [appointments, setAppointments] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Load appointment data from the database here and set it to the state
    // For now, we'll use the dummyAppointments for testing purposes
    setAppointments(dummyAppointments);
  }, []);


  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.customer_id.toString().includes(searchValue) ||
      appointment.location_id.toString().includes(searchValue) ||
      appointment.date_and_time.toLowerCase().includes(searchValue.toLowerCase()) ||
      appointment.notes.toLowerCase().includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );

  // Create events array from filteredAppointments to be used in the calendar
  const events = filteredAppointments.map((appointment) => ({
    id: appointment.id,
    title: `${appointment.notes}`,
    start: new Date(appointment.date_and_time),
    end: new Date(new Date(appointment.date_and_time).getTime() + 2 * 60 * 60 * 1000), // add 2 hours to the start time
  }));

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
        />
      </Container>
    </>
  );
};

export default AppointmentsCalendar;
