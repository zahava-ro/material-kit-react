// src/pages/CustomerPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField,
  Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { DeleteIcon } from '@mui/icons-material';
import Iconify from '../components/iconify';
import { dummyCustomers } from '../_mock/customer';
import AddCustomerModal from '../components/AddCustomer/AddCustomerModal';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  useEffect(() => {
    // Load customer data from the database here and set it to the state
    // For now, we'll use the dummyCustomers for testing purposes
    setCustomers(dummyCustomers);
  }, []);

  const addCustomer = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddCustomer = (newCustomer) => {
    // Save the newCustomer data to the database and update the customers state
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDeleteSelected = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleConfirmDelete = () => {
    // Filter out the selected customers from the state
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => !selectedCustomers.includes(customer.id))
    );
    // Clear the selected customers list
    setSelectedCustomers([]);
    // Close the confirmation dialog
    setIsConfirmationOpen(false);
  };

  const handleSelectionChange = (selection) => {
    // Update the selectedCustomers state with the IDs of selected customers
    setSelectedCustomers(selection.selectionModel);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <span style={{ color: params.value === 'Active' ? 'green' : 'red' }}>
          {params.value}
        </span>
      ),
    },
    // Add more fields here as needed
  ];

  return (
    <>
      <Helmet>
        <title>Customers</title>
      </Helmet>

      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Customers
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchValue}
              onChange={handleSearchChange}
              size="small"
            />
            <Button 
              onClick={addCustomer} 
              variant="contained" 
              startIcon={<Iconify icon="eva:plus-fill" />}>
              New Customer
            </Button>
          </Box>
        </Box>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredCustomers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={handleSelectionChange}
          />
        </div>

        {/* Delete button */}
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            disabled={selectedCustomers.length === 0}
          >
            Delete Selected
          </Button>
        </Box>

        {/* Confirmation dialog */}
        <Dialog open={isConfirmationOpen} onClose={handleCloseConfirmation}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the selected customer(s)?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmation} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <AddCustomerModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddCustomer={handleAddCustomer}
      />
    </>
  );
}
