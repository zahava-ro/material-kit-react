import React, { useState } from 'react';
import { Modal, Fade, Typography, TextField, Button, Stack } from '@mui/material';

const AddCustomerModal = ({ open, onClose, onAddCustomer }) => {
  const [customer, setCustomer] = useState({
    id: Math.random()*10000,
    name: '',
    address: '',
    email: '',
    phone: '',
    status: 'Active'
  });

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
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8 }}>
          <Typography variant="h5" gutterBottom>
            Add Customer
          </Typography>
          <Stack spacing={2} sx={{ marginBottom: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={customer.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              value={customer.address}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              value={customer.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone"
              value={customer.phone}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Add Customer
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddCustomerModal;
