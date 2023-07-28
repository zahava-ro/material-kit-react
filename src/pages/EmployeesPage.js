import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
  Button,
  Container,
  Typography,
  Box, TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { dummyEmployees } from '../_mock/employee';
import AddEmployeeModal from '../components/AddEmployee/AddEmployeeModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Employee ID', alignRight: false },
  { id: 'first_name', label: 'First Name', alignRight: false },
  { id: 'last_name', label: 'Last Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'license_id', label: 'License ID', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone_number', label: 'Phone Number', alignRight: false },
  { id: 'address_line1', label: 'Address Line 1', alignRight: false },
  { id: 'address_line2', label: 'Address Line 2', alignRight: false },
  { id: 'city', label: 'City', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'postal_code', label: 'Postal Code', alignRight: false },
  { id: 'notes', label: 'Notes', alignRight: false },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Load employee data from the database here and set it to the state
    // For now, we'll use the dummyEmployees for testing purposes
    setEmployees(dummyEmployees);
  }, []);

  const addEmployee = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddEmployee = (newEmployee) => {
    // Save the newEmployee data to the database and update the employees state
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );

  const columns = [
    { field: 'id', headerName: 'Employee ID', alignRight: false, width: 150 },
    { field: 'first_name', headerName: 'First Name', alignRight: false, width: 150 },
    { field: 'last_name', headerName: 'Last Name', alignRight: false, width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      alignRight: false,
      width: 120,
      renderCell: (params) => (
        <span style={{ color: params.value === 'Active' ? 'green' : 'red' }}>
          {params.value}
        </span>
      ),
    },
    { field: 'license_id', headerName: 'License ID', alignRight: false, width: 150 },
    { field: 'email', headerName: 'Email', alignRight: false, width: 250 },
    { field: 'phone_number', headerName: 'Phone Number', alignRight: false, width: 150 },
    { field: 'address_line1', headerName: 'Address Line 1', alignRight: false, width: 200 },
    { field: 'address_line2', headerName: 'Address Line 2', alignRight: false, width: 200 },
    { field: 'city', headerName: 'City', alignRight: false, width: 120 },
    { field: 'state', headerName: 'State', alignRight: false, width: 120 },
    { field: 'postal_code', headerName: 'Postal Code', alignRight: false, width: 150 },
    { field: 'notes', headerName: 'Notes', alignRight: false, width: 300 },
  ];
  
  return (
    <>
      <Helmet>
        <title>Employees</title>
      </Helmet>

      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Employees
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
              onClick={addEmployee} 
              variant="contained" 
              startIcon={<Iconify icon="eva:plus-fill" />}>
              New Employee
            </Button>
          </Box>
        </Box>

        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredEmployees}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
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
