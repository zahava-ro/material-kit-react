import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Iconify from '../components/iconify';
import AddMaterialModal from '../components/AddMaterial/AddMaterialModal'; // Assuming you have a modal for adding materials
// import { dummyMaterials } from '../_mock/material'; // Replace this with actual data fetched from the database

export const dummyMaterials = [
  {
    id: 1,
    product_name: 'Insecticide Spray',
    use_description: 'Effective against ants, cockroaches, and spiders.',
    services_list_id: 1,
    MSDS: 'https://example.com/msds/insecticide_spray.pdf',
    supplier_id: 101,
  },
  {
    id: 2,
    product_name: 'Rodent Bait',
    use_description: 'Used to control mice and rats.',
    services_list_id: 2,
    MSDS: 'https://example.com/msds/rodent_bait.pdf',
    supplier_id: 102,
  },
  {
    id: 3,
    product_name: 'Termite Treatment',
    use_description: 'For protecting structures from termite infestations.',
    services_list_id: 3,
    MSDS: 'https://example.com/msds/termite_treatment.pdf',
    supplier_id: 103,
  },
  {
    id: 4,
    product_name: 'Flea and Tick Powder',
    use_description: 'Kills fleas and ticks on pets and in the environment.',
    services_list_id: 4,
    MSDS: 'https://example.com/msds/flea_tick_powder.pdf',
    supplier_id: 104,
  },
  {
    id: 5,
    product_name: 'Weed Killer',
    use_description: 'Eliminates unwanted weeds and plants.',
    services_list_id: 5,
    MSDS: 'https://example.com/msds/weed_killer.pdf',
    supplier_id: 105,
  },
  // Add more materials here as needed
];


export default function MaterialPage() {
  const [materials, setMaterials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Load material data from the database here and set it to the state
    // For now, we'll use the dummyMaterials for testing purposes
    setMaterials(dummyMaterials);
  }, []);

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
      material.product_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      material.use_description.toLowerCase().includes(searchValue.toLowerCase()) ||
      material.MSDS.toLowerCase().includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );

  const columns = [
    { field: 'id', headerName: 'ID', alignRight: false, width: 100 },
    { field: 'product_name', headerName: 'Material Name', alignRight: false, width: 200 },
    { field: 'use_description', headerName: 'Use Description', alignRight: false, width: 400 },
    { field: 'services_list_id', headerName: 'ID of Group of Services', alignRight: false, width: 300 },
    { field: 'MSDS', headerName: 'MSDS', alignRight: false, width: 300 },
    { field: 'supplier_id', headerName: 'Supplier ID', alignRight: false, width: 200 },
  ];

  return (
    <>
      <Helmet>
        <title>Materials</title>
      </Helmet>

      <Container>
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
