import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Iconify from '../components/iconify';
import AddTaskModal from '../components/AddTask/AddTaskModal';
import { fetchAllFromTable, addToTable } from '../utils/databaseOperations';
import { AppTasks } from '../sections/@dashboard/app';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    (async () => {
      // Load task data from the database here and set it to the state
      const dataFromDB = await fetchAllFromTable('tasks');
      setTasks(dataFromDB);
    })();
  }, []);

  const taskList = tasks.map((task) => ({
    id: task.item_number,
    label: task.note,
  }));

  const addTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = async (newTask) => {
    // Save the newTask data to the database and update the tasks state
    try {
      await addToTable('tasks', newTask);
    } catch (e) {
      console.log(e);
    }
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (task.type_of_activity?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (task.assigned_to?.toLowerCase() ?? '').includes(searchValue.toLowerCase()) ||
      (task.note?.toLowerCase() ?? '').includes(searchValue.toLowerCase())
    // Add more conditions here for additional fields you want to search
  );
  

  const columns = [
    { field: 'item_number', headerName: 'Item Number', align: 'left', width: 120 },
    { field: 'employee_id', headerName: 'Employee ID', align: 'left', width: 120 },
    { field: 'date_entered', headerName: 'Date Entered', align: 'left', width: 180 },
    { field: 'date_completed', headerName: 'Date Completed', align: 'left', width: 180 },
    { field: 'type_of_activity', headerName: 'Type of Activity', align: 'left', width: 200 },
    { field: 'assigned_to', headerName: 'Assigned To', align: 'left', width: 180 },
    { field: 'note', headerName: 'Note', align: 'left', width: 400 },
  ];

  return (
    <>
      <Helmet><title> High Rock Tasks </title></Helmet>

      <Container maxWidth="xl" style={{ width: '100%', minWidth: '100%', maxWidth: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tasks
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
              onClick={addTask}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Task
            </Button>
          </Box>
        </Box>

        <div style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={filteredTasks}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            getRowId={(row) => row.item_number}
          />
          
        </div>
      </Container>

      <AddTaskModal open={isModalOpen} onClose={handleCloseModal} onAddTask={handleAddTask} />
    </>
  );
}
