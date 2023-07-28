import React, { useState, useEffect } from 'react';
import { Modal, Fade, Typography, TextField, Button, Stack, IconButton, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { dummyMaterials } from '../_mock/materials';

const dummyMaterials = [
    { product_id: 1, product_name: 'Material A' },
    { product_id: 2, product_name: 'Material B' },
    { product_id: 3, product_name: 'Material C' },
    // Add more materials as needed
];

const AddServiceModal = ({ open, onClose, onAddService }) => {
  const [service, setService] = useState({
    id: Math.floor(Math.random() * 10000), // Service ID generated based on SQL data model
    service_name: '',
    description: '',
    materials_list_id: '',
    cost: '',
    notes: '',
  });

  const [materials, setMaterials] = useState([]); // State to hold the materials data

  useEffect(() => {
    // Fetch the materials data from the database here
    // For now, we'll use dummyMaterials for testing purposes
    setMaterials(dummyMaterials);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onAddService(service);
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
              Add Service
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>
          <Stack spacing={2} sx={{ marginBottom: 2 }}>
            <TextField
              name="service_name"
              label="Service Name"
              value={service.service_name}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="description"
              label="Description"
              value={service.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="materials-list">Materials List</InputLabel>
              <Select
                name="materials_list_id"
                value={service.materials_list_id}
                onChange={handleChange}
                label="Materials List"
                inputProps={{ id: 'materials-list' }}
              >
                {materials.map((material) => (
                  <MenuItem key={material.product_id} value={material.product_id}>
                    {material.product_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="cost"
              label="Cost"
              value={service.cost}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="notes"
              label="Notes"
              value={service.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              size="small"
            />
          </Stack>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Add Service
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddServiceModal;
