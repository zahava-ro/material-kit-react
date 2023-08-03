import React, { useState, useEffect } from 'react';
import { Modal,Fade,Typography,TextField,Button,Stack,IconButton,MenuItem,FormControl,Select,InputLabel} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchAllFromTable } from '../../utils/databaseOperations';

const dummyEmployees = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      status: 'Active',
      license_id: 'EMP001',
      email: 'john.doe@example.com',
      phone_number: '555-123-4567',
      address_line1: '123 Main Street',
      address_line2: 'Apt 456',
      city: 'Cityville',
      state: 'Stateland',
      postal_code: '12345',
      notes: 'Certified pest control technician',
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      status: 'Archived',
      license_id: 'EMP002',
      email: 'jane.smith@example.com',
      phone_number: '555-987-6543',
      address_line1: '456 Park Avenue',
      address_line2: 'Suite 789',
      city: 'Townsville',
      state: 'Stateland',
      postal_code: '56789',
      notes: 'Former employee, no longer active',
    },
    {
      id: 3,
      first_name: 'Robert',
      last_name: 'Johnson',
      status: 'Active',
      license_id: 'EMP003',
      email: 'robert.johnson@example.com',
      phone_number: '555-456-7890',
      address_line1: '789 Elm Road',
      address_line2: 'Unit 101',
      city: 'Cityville',
      state: 'Stateland',
      postal_code: '12345',
      notes: 'Experienced exterminator',
    },
    {
      id: 4,
      first_name: 'Emily',
      last_name: 'Wilson',
      status: 'Active',
      license_id: 'EMP004',
      email: 'emily.wilson@example.com',
      phone_number: '555-876-5432',
      address_line1: '567 Oak Lane',
      address_line2: 'Unit 202',
      city: 'Townsville',
      state: 'Stateland',
      postal_code: '56789',
      notes: 'Friendly and reliable technician',
    },
    {
      id: 5,
      first_name: 'Michael',
      last_name: 'Lee',
      status: 'Archived',
      license_id: 'EMP005',
      email: 'michael.lee@example.com',
      phone_number: '555-234-5678',
      address_line1: '901 Pine Street',
      address_line2: 'Apt 303',
      city: 'Cityville',
      state: 'Stateland',
      postal_code: '12345',
      notes: 'Retired technician, no longer active',
    },
    {
      id: 6,
      first_name: 'Sophia',
      last_name: 'Brown',
      status: 'Active',
      license_id: 'EMP006',
      email: 'sophia.brown@example.com',
      phone_number: '555-765-4321',
      address_line1: '234 Cedar Avenue',
      address_line2: 'Suite 404',
      city: 'Townsville',
      state: 'Stateland',
      postal_code: '56789',
      notes: 'Specializes in pest identification',
    },
    // Add more dummy employees here...
  ];

const dummyLocations = [
    {
      location_id: 1,
      customer_id: 1,
      address_line1: '123 Main Street',
      address_line2: 'Apt 456',
      state: 'Stateland',
      city: 'Cityville',
      postal_code: '12345',
      primary_contact: 'John Doe',
      secondary_contact: 'Jane Smith',
      notes: 'Headquarters',
    },
    {
      location_id: 2,
      customer_id: 2,
      address_line1: '456 Park Avenue',
      address_line2: 'Suite 789',
      state: 'Stateland',
      city: 'Townsville',
      postal_code: '56789',
      primary_contact: 'Jane Smith',
      secondary_contact: 'John Doe',
      notes: 'Branch Office',
    },
    {
      location_id: 3,
      customer_id: 1,
      address_line1: '789 Elm Road',
      address_line2: 'Unit 101',
      state: 'Stateland',
      city: 'Cityville',
      postal_code: '12345',
      primary_contact: 'Robert Johnson',
      secondary_contact: 'Emily Wilson',
      notes: 'Warehouse',
    },
    // Add more dummy locations here...
  ];
  
const AddAppointmentModal = ({ open, onClose, onAddAppointment }) => {

  useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open]);

  useEffect(() => { (async () => {
    const customerOptions = await fetchAllFromTable('customer');
    setCustomerDropdownOptions(customerOptions);
    const serviceOptions = await fetchAllFromTable('service');
    setServicesSelectOptions(serviceOptions);
  })() }, []);

  const initialAppointmentState = {
    appointment_id: Math.floor(Math.random() * 10000), // Appointment ID generated 
    customer_id: 0,
    location_id: 0,
    date_and_time: '',
    service_group_id: [],
    employee_group_id: [],
    cost: 0,
    completion_status: '',
    payment_status: '',
    frequency_in_days: 0,
    followup_appointment: '',
    followup_reason: '',
    notes: '',
  };

  const [appointment, setAppointment] = useState(initialAppointmentState);
  const [customerDropdownOptions, setCustomerDropdownOptions] = useState([]);
  const [servicesSelectOptions, setServicesSelectOptions] = useState([]);

  const resetState = () => {
    setAppointment(initialAppointmentState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    // Since it's a multi-select, the value will be an array of selected options
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddAppointment(appointment);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={open}>
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: 800 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Add Appointment
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>
          <Stack spacing={2} sx={{ marginBottom: 2 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <FormControl fullWidth size="small">
                <InputLabel htmlFor="customer-id">Customer</InputLabel>
                <Select
                    name="customer_id"
                    value={appointment.customer_id}
                    onChange={handleChange}
                    label="Customer"
                    inputProps={{ id: 'customer-id' }}
                >
                    {customerDropdownOptions.map((customer) => (
                    <MenuItem key={customer.customer_id} value={customer.customer_id}>
                        {customer.company_name}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="location-id">Location</InputLabel>
              <Select
                name="location_id"
                value={appointment.location_id}
                onChange={handleChange}
                label="Location"
                inputProps={{ id: 'location-id' }}
              >
                {/* Replace 'dummyLocations' with the actual data for locations */}
                {dummyLocations.map((location) => (
                  <MenuItem key={location.location_id} value={location.location_id}>
                    {`${location.address_line1} - ${location.notes}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <InputLabel htmlFor="date_and_time">Date and Time</InputLabel>
            <TextField
              name="date_and_time"
              value={appointment.date_and_time}
              onChange={handleChange}
              size="small"
              type="datetime-local"
            />
            <TextField
              name="frequency_in_days"
              label="Frequency in Days"
              value={appointment.frequency_in_days}
              onChange={handleChange}
            //   fullWidth
              size="small"
              type="number"
            />
          </div>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="service-group-id">Services Needed</InputLabel>
              <Select
                name="service_group_id"
                value={appointment.service_group_id}
                onChange={handleMultiSelectChange}
                label="Services Needed"
                multiple
                inputProps={{ id: 'service-group-id' }}
              >
                {servicesSelectOptions.map((service) => (
                  <MenuItem key={service.service_id} value={service.service_id}>
                    {service.service_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="employee-group-id">Assign Employees</InputLabel>
              <Select
                name="employee_group_id"
                value={appointment.employee_group_id}
                onChange={handleMultiSelectChange}
                label="Employee Group"
                multiple
                inputProps={{ id: 'employee-group-id' }}
              >
                {/* Replace 'dummyEmployees' with the actual data for employees */}
                {dummyEmployees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {`${employee.first_name} ${employee.last_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ display: 'flex', gap: 10 }}>
            <TextField
              name="cost"
              label="Cost"
              value={appointment.cost}
              onChange={handleChange}
              fullWidth
              size="small"
              type="number"
            />
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="completion-status">Completion Status</InputLabel>
              <Select
                name="completion_status"
                value={appointment.completion_status}
                onChange={handleChange}
                label="Completion Status"
                inputProps={{ id: 'completion-status' }}
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="payment-status">Payment Status</InputLabel>
              <Select
                name="payment_status"
                value={appointment.payment_status}
                onChange={handleChange}
                label="Payment Status"
                inputProps={{ id: 'payment-status' }}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Billed">Billed</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
            <InputLabel for='followup_appointment'>Follow-up Appointment</InputLabel>
            <TextField
              name="followup_appointment"
              value={appointment.followup_appointment}
              onChange={handleChange}
              size="small"
              type="datetime-local"
            />
            </div>
            <TextField
              name="followup_reason"
              label="Follow-up Reason"
              value={appointment.followup_reason}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              size="small"
            />
            <TextField
              name="notes"
              label="Notes"
              value={appointment.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              size="small"
            />
          </Stack>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Add Appointment
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddAppointmentModal;
