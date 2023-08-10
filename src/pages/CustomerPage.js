// src/pages/CustomerPage.js
import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import { fetchAllFromTable, addToTable } from '../utils/databaseOperations';
import { dummyCustomers } from '../_mock/customer';
import AddCustomerModal from '../components/AddCustomer/AddCustomerModal';
import Iconify from '../components/iconify';

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => { (async () => {
    // Load customer data from the database here and set it to the state
    const dataFromDB = await fetchAllFromTable('customer');
    setCustomers(dataFromDB);
  })() }, []);

  const addCustomer = () => { setIsModalOpen(true) };
  const handleCloseModal = () => { setIsModalOpen(false) };
  const handleSearchChange = (event) => { setSearchValue(event.target.value) };

  const handleAddCustomer = async (newCustomer) => {
    // Save the newCustomer data to the database and update the customers state
    await addToTable('customer', newCustomer);
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.company_name?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (customer.email?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (customer.status?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (customer.phone_number?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (customer.notes?.toLowerCase() ?? '').includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );  

  const columns = [
    // { field: 'customer_id', headerName: 'ID', width: 100 },
    { field: 'company_name', headerName: 'Company Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone_number', headerName: 'Phone', width: 150 },
    {field: 'status',headerName: 'Status',width: 120,editable: true,renderCell: (params) => 
      (<span style={{ color: params.value === 'Active' ? 'green' : 'red' }}>{params.value}</span>),
    },
    { field: 'notes', headerName: 'Notes', width: 400 },
    // Add more fields here as needed
  ];

  return (
    <>
      <Helmet><title> High Rock Customers </title></Helmet>

      <Container maxWidth="xl" style={{ width: '100%', minWidth: '100%', maxWidth: '100%' }}>
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

        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={filteredCustomers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            getRowId={(row) =>  row.customer_id}
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