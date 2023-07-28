import React, { useState } from 'react';
import { Modal, Fade, Typography, TextField, Button, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddEmployeeModal = ({ open, onClose, onAddEmployee }) => {
  const [employee, setEmployee] = useState({
    id: Math.floor(Math.random() * 10000), // Employee ID generated based on SQL data model
    first_name: '',
    last_name: '',
    status: 'Active',
    license_id: '',
    email: '',
    phone_number: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddEmployee(employee);
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
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, maxWidth: 800 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Add Employee
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>
          <Stack spacing={2} sx={{ marginBottom: 2 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <TextField
                name="first_name"
                label="First Name"
                value={employee.first_name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                name="last_name"
                label="Last Name"
                value={employee.last_name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <TextField
                name="email"
                label="Email"
                value={employee.email}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                name="phone_number"
                label="Phone Number"
                value={employee.phone_number}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </div>
            <TextField
              name="address_line1"
              label="Address Line 1"
              value={employee.address_line1}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="address_line2"
              label="Address Line 2"
              value={employee.address_line2}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <TextField
                name="city"
                label="City"
                value={employee.city}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                name="state"
                label="State"
                value={employee.state}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                name="postal_code"
                label="Postal Code"
                value={employee.postal_code}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </div>
            <TextField
              name="license_id"
              label="License ID"
              value={employee.license_id}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="notes"
              label="Notes"
              value={employee.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              size="small"
            />
          </Stack>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Add Employee
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddEmployeeModal;


