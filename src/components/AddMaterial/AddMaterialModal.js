import React, { useState } from 'react';
import { Modal, Fade, Typography, TextField, Button, Stack, IconButton, MenuItem, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddMaterialModal = ({ open, onClose, onAddMaterial }) => {
  const [material, setMaterial] = useState({
    id: Math.floor(Math.random() * 10000), // Product ID generated based on SQL data model
    product_name: '',
    use_description: '',
    services_list_id: '',
    MSDS: null,
    supplier_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: value,
    }));
  };

  const handleMSDSChange = (e) => {
    const file = e.target.files[0];
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      MSDS: file,
    }));
  };

  const handleSubmit = () => {
    onAddMaterial(material);
    onClose();
  };

  // Sample data for services_list_id and supplier_id
  const dummyServiceGroups = [
    { id: 1, name: 'Service Group 1' },
    { id: 2, name: 'Service Group 2' },
    { id: 3, name: 'Service Group 3' },
  ];

  const dummySuppliers = [
    { id: 1, name: 'Supplier 1' },
    { id: 2, name: 'Supplier 2' },
    { id: 3, name: 'Supplier 3' },
  ];

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
              Add Material
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>
          <Stack spacing={2} sx={{ marginBottom: 2 }}>
            <TextField
              name="product_name"
              label="Product Name"
              value={material.product_name}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="use_description"
              label="Use Description"
              value={material.use_description}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="services_list_id"
              label="ID of Group of Services Needed"
              select
              value={material.services_list_id}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              {dummyServiceGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </TextField>
            <Typography >MSDS (Material Safety Data Sheet)</Typography>
            <Button variant="contained" component="label" sx={{width: 100}}>
              Upload
              <input hidden name="MSDS" type="file" onChange={handleMSDSChange}/>
            </Button>
            <TextField
              name="supplier_id"
              label="Supplier ID"
              select
              value={material.supplier_id}
              onChange={handleChange}
              fullWidth
              size="small"
            >
              {dummySuppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Add Material
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddMaterialModal;
