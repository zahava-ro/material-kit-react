// Add Customer Modal (appears when “New Customer” button is clicked)
// src\components\AddCustomer\AddCustomerModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Fade, Typography, TextField, Button, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddCustomerModal = ({ open, onClose, onAddCustomer }) => {

  useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open]);

  const initialCustomerState = {
    customer_id: Math.floor(Math.random() * 10000), 
    company_name: '',
    notes: '',
    email: '',
    phone_number: '',
    status: 'Active',
  };

  const [customer, setCustomer] = useState(initialCustomerState);

  const resetState = () => {
    setCustomer(initialCustomerState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddCustomer(customer);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}>
          <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: 600 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" gutterBottom>
                New Customer
              </Typography>
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </div>
            <Stack spacing={2}>
              <TextField
                name="company_name"
                label="Name"
                value={customer.company_name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                name="email"
                label="Email"
                value={customer.email}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                name="phone_number"
                label="Phone"
                value={customer.phone_number}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                name="notes"
                label="Notes"
                value={customer.notes}
                onChange={handleChange}
                fullWidth
                size="small"
                multiline
                rows={4}
              />
            </Stack>
            <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth size="small">
              Add Customer
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddCustomerModal;