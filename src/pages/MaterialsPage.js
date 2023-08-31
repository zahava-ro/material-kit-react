// Materials Page
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Iconify from '../components/iconify';
import AddMaterialModal from '../components/AddMaterial/AddMaterialModal';
import { fetchAllFromTable } from '../utils/databaseOperations';

export default function MaterialPage() {
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => { (async () => {
    // Load material data from the database here and set it to the state
    const dataFromDB = await fetchAllFromTable('materials');
    setMaterials(dataFromDB);
  })() }, []);

  const addMaterial = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddMaterial = (newMaterial) => {
    // Save the newMaterial data to the database and update the materials state
    setMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredMaterials = materials.filter(
    (material) =>
      (material.product_name?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (material.use_description?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (material.MSDS?.toLowerCase() ?? '').includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );
  
  const columns = [
    // { field: 'id', headerName: 'ID', alignRight: false, width: 100 },
    { field: 'product_name', headerName: 'Material Name', alignRight: false, width: 200 },
    { field: 'use_description', headerName: 'Use Description', alignRight: false, width: 400 },
    { field: 'MSDS', headerName: 'MSDS', alignRight: false, width: 100 },
    { field: 'supplier_id', headerName: 'Supplier', alignRight: false, width: 250 },
    { field: 'services_list_id', headerName: 'Services that use this material', alignRight: false, width: 250 },
  ];

  return (
    <>
      <Helmet><title> High Rock Materials </title></Helmet>

      <Container maxWidth="xl" style={{ width: '100%', minWidth: '100%', maxWidth: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Materials
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
              onClick={addMaterial}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Material
            </Button>
          </Box>
        </Box>

        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={filteredMaterials}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            getRowId={(row) =>  row.product_id}
          />
        </div>
      </Container>

      <AddMaterialModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddMaterial={handleAddMaterial}
      />
    </>
  );
}
