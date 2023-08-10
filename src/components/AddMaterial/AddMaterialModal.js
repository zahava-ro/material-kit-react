import React, { useState } from 'react';
import {Modal,Fade,Typography,TextField,Button,Stack,IconButton,MenuItem,Select,FormControl,InputLabel} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const dummyServices = [
  {
    id: 1,
    service_name: 'Ant Extermination',
    description: 'Exterminate ants in and around the property',
    materials_list_id: 1, // Assuming this corresponds to a specific materials list for ant extermination
    cost: 100.0,
    notes: 'Ant extermination service for residential properties',
  },
  {
    id: 2,
    service_name: 'Termite Inspection',
    description: 'Thorough inspection for termite presence and damage',
    materials_list_id: 2, // Assuming this corresponds to a specific materials list for termite inspection
    cost: 150.0,
    notes: 'Termite inspection service for commercial properties',
  },
  {
    id: 3,
    service_name: 'Rodent Control',
    description: 'Control and removal of rodents from the property',
    materials_list_id: 3, // Assuming this corresponds to a specific materials list for rodent control
    cost: 120.0,
    notes: 'Rodent control service for both residential and commercial properties',
  },
  {
    id: 4,
    service_name: 'Bed Bug Treatment',
    description: 'Elimination of bed bugs from infested areas',
    materials_list_id: 4, // Assuming this corresponds to a specific materials list for bed bug treatment
    cost: 180.0,
    notes: 'Effective bed bug treatment service',
  },
  {
    id: 5,
    service_name: 'Mosquito Control',
    description: 'Mosquito eradication and prevention services',
    materials_list_id: 5, // Assuming this corresponds to a specific materials list for mosquito control
    cost: 90.0,
    notes: 'Mosquito control service to protect outdoor spaces',
  },
  // Add more services here as needed
];

const AddMaterialModal = ({ open, onClose, onAddMaterial }) => {
  const [material, setMaterial] = useState({
    id: Math.floor(Math.random() * 10000),
    product_name: '',
    use_description: '',
    services_list_id: [], // Initialize as an empty array
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

  const dummySuppliers = [
    { id: 1, name: 'EcoGuard Pest Solutions' },
    { id: 2, name: 'SafeZone Pest Control Supplies' },
    { id: 3, name: 'PestMaster Pro' },
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
              multiline
              rows={4}
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="services_list_id">Select Services that use this Material</InputLabel>
              <Select
                name="services_list_id"
                multiple
                value={material.services_list_id}
                onChange={handleChange}
                inputProps={{ id: 'services_list_id' }}
              >
                {dummyServices.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.service_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography>MSDS (Material Safety Data Sheet)</Typography>
            <Button variant="contained" component="label" sx={{ width: 100 }}>
              Upload
              <input hidden name="MSDS" type="file" onChange={handleMSDSChange} />
            </Button>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="supplier_id">Supplier</InputLabel>
              <Select
                name="supplier_id"
                value={material.name} // should really be id
                onChange={handleChange}
                inputProps={{ id: 'supplier_id' }}
              >
                {dummySuppliers.map((supplier) => (
                  <MenuItem key={supplier.name} value={supplier.name}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
