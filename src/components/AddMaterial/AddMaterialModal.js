// Add Material Modal
import React, { useState, useEffect } from 'react';
import {Modal,Fade,Typography,TextField,Button,Stack,IconButton,MenuItem,Select,FormControl,InputLabel} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchAllFromTable } from '../../utils/databaseOperations';

const AddMaterialModal = ({ open, onClose, onAddMaterial }) => {
  const [material, setMaterial] = useState({
    id: Math.floor(Math.random() * 10000),
    product_name: '',
    use_description: '',
    services_list_id: [],
    MSDS: null,
    supplier_id: '',
  });

  const [services, setServices] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => { (async () => {
    // Load services and supplier data from the database here and set it to the state
    let dataFromDB = await fetchAllFromTable('service');
    setServices(dataFromDB);
    dataFromDB = await fetchAllFromTable('supplier');
    setSuppliers(dataFromDB);
  })() }, []);

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
                {services.map((service) => (
                  <MenuItem key={service.service_id} value={service.service_id}>
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
                {suppliers.map((supplier) => (
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
