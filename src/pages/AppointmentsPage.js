import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Iconify from '../components/iconify';
import { fetchAllFromTable, addToTable } from '../utils/databaseOperations';
import AddAppointmentModal from '../components/AddAppointment/AddAppointmentModal';
import AppointmentsCalendar from '../components/AppointmentsCalendar/AppointmentsCalendar';
import './Calendar.css'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => { (async () => {
    // Load data from the database and set it to the state
    const dataFromDB = await fetchAllFromTable('appointment');
    setAppointments(dataFromDB);
  })() }, []);

  const addAppointment = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const createEmployeeGroup = (ids) => {
    let employeeGroupID = 0;
    // code to create employee group in the database useing the selected employees
    // for now, were just storing the NUMBER of employees assigned to this appointment
    employeeGroupID = ids.length || 0;
    return employeeGroupID
  };

  const createServiceGroup = (ids) => {
    let serviceGroupID = 0;
    // code to create service group in the database useing the selected services
    // for now, were just storing the NUMBER of services assigned to this appointment
    serviceGroupID = ids.length || 0;
    return serviceGroupID
  };

  // when an appointment is about to be added to the database, we need to make sure its in the proper format
  const handleAddAppointment = async (newAppointment) => {
    const modifiedAppointment = { ...newAppointment };
    modifiedAppointment.employee_group_id = createEmployeeGroup(newAppointment.employee_group_id);
    modifiedAppointment.service_group_id = createServiceGroup(newAppointment.service_group_id);
    // Convert date_and_time to a valid date format or 'null'
    const dateAndTimeDate = new Date(modifiedAppointment.date_and_time);
    modifiedAppointment.date_and_time = dateAndTimeDate.toString() !== 'Invalid Date'
      ? dateAndTimeDate.toISOString()
      : null;
    // Convert followup_appointment to a valid date format or 'null'
    const followupAppointmentDate = new Date(modifiedAppointment.followup_appointment);
    modifiedAppointment.followup_appointment = followupAppointmentDate.toString() !== 'Invalid Date'
      ? followupAppointmentDate.toISOString()
      : null;
    // Save the newAppointment data to the database and update the appointments state
    await addToTable('appointment', modifiedAppointment);
    setAppointments((prevAppointments) => [...prevAppointments, modifiedAppointment]);
    const dataFromDB = await fetchAllFromTable('appointment');
    setAppointments(dataFromDB);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      (appointment.customer_id?.toString() || '').includes(searchValue) ||
      (appointment.location_id?.toString() || '').includes(searchValue) ||
      (appointment.date_and_time && appointment.date_and_time?.toLowerCase().includes(searchValue.toLowerCase())) ||
      (appointment.notes && appointment.notes?.toLowerCase().includes(searchValue.toLowerCase())) || 
      (appointment.completion_status && appointment.completion_status?.toLowerCase().includes(searchValue.toLowerCase())) ||
      (appointment.cost?.toString() || '') === searchValue ||
      (appointment.payment_status && appointment.payment_status?.toLowerCase().includes(searchValue.toLowerCase()))
      // Add more conditions here for additional fields you want to search
  );
  
  const columns = [
    // { field: 'appointment_id', headerName: 'ID', align: 'center', width: 100 },
    { field: 'notes', headerName: 'Notes', width: 300, editable: true },
    { field: 'completion_status', headerName: 'Completion Status', align: 'center', width: 150, editable: true },
    { field: 'date_and_time', headerName: 'Date and Time', align: 'center', width: 200, 
      renderCell: (params) => {return <span>{new Date(params.value).toLocaleString()}</span> },
    },
    { field: 'cost', headerName: 'Cost', align: 'center', width: 100, editable: true },
    { field: 'payment_status', headerName: 'Payment Status', align: 'center', width: 150, editable: true },
    { field: 'followup_appointment', headerName: 'Follow-up Appointment', align: 'center', width: 200, 
      renderCell: (params) => {return <span>{params.value}</span>},
    },
    { field: 'followup_reason', headerName: 'Follow-up Reason', align: 'center', width: 200, editable: true },
    { field: 'customer_id', headerName: 'Customer ID', align: 'center', width: 150 },
    { field: 'location_id', headerName: 'Location ID', align: 'center', width: 150 },
    { field: 'service_group_id', headerName: 'Services Needed', align: 'center', width: 200 },
    { field: 'employee_group_id', headerName: 'Employees Assigned', align: 'center', width: 200 },
    { field: 'frequency_in_days', headerName: 'Frequency in Days', align: 'center', width: 150 },
  ];  

  return (
    <>
      <Helmet><title> High Rock Appointments</title></Helmet>

      <Container maxWidth="xl" style={{ width: '100%', minWidth: '100%', maxWidth: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>Appointments List</Typography>
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
            getRowId={(row) => row.appointment_id}
          />
        </div>

        <Typography variant="h4" gutterBottom><br/><br/>Calendar<br/></Typography>
        <AppointmentsCalendar defaultView="week" />
      </Container>

      <AddAppointmentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddAppointment={handleAddAppointment}
      />
    </>
  );
}
