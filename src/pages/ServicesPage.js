// Services Page
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Iconify from '../components/iconify';
import AddServiceModal from '../components/AddService/AddServiceModal'; 
import { fetchAllFromTable, addToTable } from '../utils/databaseOperations';

export default function ServicePage() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => { (async () => {
    // Load services data from the database here and set it to the state
    const dataFromDB = await fetchAllFromTable('service');
    setServices(dataFromDB);
  })() }, []);

  const addService = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddService = async (newService) => {
    // Save the newService data to the database and update the services state
    try { await addToTable('service', newService);
    } catch (e) { console.log(e) }
    setServices((prevServices) => [...prevServices, newService]);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredServices = services.filter(
    (service) =>
      (service.service_name?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (service.description?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (service.notes?.toLowerCase() ?? '').includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );  

  const columns = [
    // { field: 'service_id', headerName: 'ID', alignRight: false, width: 100 },
    { field: 'service_name', headerName: 'Service Name', alignRight: false, width: 200 },
    { field: 'cost', headerName: 'Cost', alignRight: false, width: 100 },
    { field: 'description', headerName: 'Description', alignRight: false, width: 400 },
    { field: 'notes', headerName: 'Notes', alignRight: false, width: 400 },
    { field: 'materials_list_id', headerName: 'Materials Needed', alignRight: false, width: 300 },
  ];

  return (
    <>
      <Helmet><title> High Rock Services </title></Helmet>

      <Container maxWidth="xl" style={{ width: '100%', minWidth: '100%', maxWidth: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Services
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
              onClick={addService}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Service
            </Button>
          </Box>
        </Box>

        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={filteredServices}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            getRowId={(row) =>  row.service_id}
          />
        </div>
      </Container>

      <AddServiceModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddService={handleAddService}
      />
    </>
  );
}
