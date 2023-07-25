// src/pages/ScrapPage.js
import { useState, useEffect } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { dummyCustomers } from '../_mock/customer';
import AddCustomerModal from '../components/AddCustomer/AddCustomerModal';

export default function ScrapPage() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    // Add more fields here as needed
  ];

  return (
    <>
      <Helmet>
        <title> Scrap Page for Development </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Scrap Page for Development
          </Typography>
          <Button onClick={addCustomer} variant="contained">
            Add Customer
          </Button>
        </Stack>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={customers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Container>

      <AddCustomerModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddCustomer={handleAddCustomer}
      />
    </>
  );
}
