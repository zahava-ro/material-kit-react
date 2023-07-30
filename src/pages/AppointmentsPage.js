import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Iconify from '../components/iconify';
import AddAppointmentModal from '../components/AddAppointment/AddAppointmentModal';
import AppointmentsCalendar from '../components/AppointmentsCalendar/AppointmentsCalendar';

import './Calendar.css'

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

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Load appointment data from the database here and set it to the state
    // For now, we'll use the dummyAppointments for testing purposes
    setAppointments(dummyAppointments);
  }, []);

  const addAppointment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAppointment = (newAppointment) => {
    // Save the newAppointment data to the database and update the appointments state
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.customer_id.toString().includes(searchValue) ||
      appointment.location_id.toString().includes(searchValue) ||
      appointment.date_and_time.toLowerCase().includes(searchValue.toLowerCase()) ||
      appointment.notes.toLowerCase().includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );

  const columns = [
    { field: 'id', headerName: 'ID', align: 'center' },
    { field: 'customer_id', headerName: 'Customer ID', align: 'center' },
    { field: 'location_id', headerName: 'Location ID', align: 'center' },
    { field: 'date_and_time', headerName: 'Date and Time', align: 'center', sortComparator: (v1, v2, row1, row2) => new Date(v1).getTime() - new Date(v2).getTime(), },
    { field: 'service_group_id', headerName: 'Services Needed', align: 'center' },
    { field: 'employee_group_id', headerName: 'Employees Needed', align: 'center' },
    { field: 'cost', headerName: 'Cost', align: 'center', editable: 'true'  },
    { field: 'completion_status', headerName: 'Completion Status', align: 'center', editable: 'true' },
    { field: 'payment_status', headerName: 'Payment Status', align: 'center', editable: 'true'  },
    { field: 'frequency_in_days', headerName: 'Frequency in Days', align: 'center' },
    { field: 'followup_appointment', headerName: 'Follow-up Appointment', align: 'center' },
    { field: 'followup_reason', headerName: 'Follow-up Reason', align: 'center', editable: 'true'  },
    { field: 'notes', headerName: 'Notes', align: 'center', editable: 'true'  },
  ];


  return (
    <>
      <Helmet>
        <title>Appointments</title>
      </Helmet>

      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Appointments List
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchValue}
              onChange={handleSearchChange}
              size="small"
            />
            <Button onClick={addAppointment} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Appointment
            </Button>
          </Box>
        </Box>


        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={filteredAppointments}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            sortModel={[
              {
                field: 'date_and_time',
                sort: 'asc',
              },
            ]}
          />
        </div>

        <Typography variant="h4" gutterBottom>
          <br/><br/>
          Calendar (Week)
          <br/>
        </Typography>
        <AppointmentsCalendar defaultView="week"/>
      </Container>

      <AddAppointmentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddAppointment={handleAddAppointment}
      />
    </>
  );
}
