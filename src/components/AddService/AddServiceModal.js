import React, { useState, useEffect } from 'react';
import { Modal, Fade, Typography, TextField, Button, Stack, IconButton, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { dummyMaterialsLists } from '../_mock/materials'; // Replace this with actual data fetched from the database

const dummyMaterialsLists = [
    {
        id: 1,
        list_name: 'Materials List 1',
    },
    {
        id: 2,
        list_name: 'Materials List 2',
    },
    {
        id: 3,
        list_name: 'Materials List 3',
    },
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

  const [materialsLists, setMaterialsLists] = useState([]); // State to hold the materials data

  useEffect(() => {
    // Fetch the materials data from the database here
    // For now, we'll use dummyMaterialsLists for testing purposes
    setMaterialsLists(dummyMaterialsLists);
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
                {materialsLists.map((materialList) => (
                  <MenuItem key={materialList.id} value={materialList.id}>
                    {materialList.list_name}
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
