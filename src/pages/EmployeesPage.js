import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddEmployeeModal from '../components/AddEmployee/AddEmployeeModal';
import { fetchAllFromTable } from '../utils/databaseOperations';
import Iconify from '../components/iconify';

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => { (async () => {
    // Load customer data from the database here and set it to the state
    const dataFromDB = await fetchAllFromTable('pest_control_employees');
    setEmployees(dataFromDB);
  })() }, []);

  const addEmployee = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddEmployee = (newEmployee) => {
    // Save the newEmployee data to the database and update the employees state
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.first_name?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (employee.email?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (employee.notes?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (employee.license_id?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (employee.phone_number?.toLowerCase() ?? '').includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );  

  const columns = [
    // { field: 'employee_id', headerName: 'ID', alignRight: false },
    { field: 'first_name', headerName: 'First Name', alignRight: false, width: 150 },
    { field: 'last_name', headerName: 'Last Name', alignRight: false, width: 150 },
    {field: 'status',headerName: 'Status',alignRight: false,width: 120,editable: true,renderCell: (params) => (
        <span style={{ color: params.value === 'Active' ? 'green' : 'red' }}>{params.value}</span>),
    },
    { field: 'license_id', headerName: 'License ID', alignRight: false, width: 120 },
    { field: 'email', headerName: 'Email', alignRight: false, width: 180 },
    { field: 'phone_number', headerName: 'Phone Number', alignRight: false, width: 150 },
    { field: 'address_line1', headerName: 'Address Line 1', alignRight: false, width: 200 },
    // { field: 'address_line2', headerName: 'Address Line 2', alignRight: false, width: 200 },
    { field: 'city', headerName: 'City', alignRight: false, width: 120 },
    { field: 'state', headerName: 'State', alignRight: false, width: 120 },
    { field: 'postal_code', headerName: 'Postal Code', alignRight: false, width: 150 },
    { field: 'notes', headerName: 'Notes', alignRight: false, width: 300 },
  ];
  
  return (
    <>
      <Helmet><title>High Rock Employees</title></Helmet>

      <Container maxWidth="xl" style={{ width: '100%', minWidth: '100%', maxWidth: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employees
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField label="Search" variant="outlined"value={searchValue}onChange={handleSearchChange}size="small"/>
            <Button onClick={addEmployee} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Employee
            </Button>
          </Box>
        </Box>

        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={filteredEmployees}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            getRowId={(row) =>  row.employee_id}
          />
        </div>
      </Container>

      <AddEmployeeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddEmployee={handleAddEmployee}
      />
    </>
  );
}
