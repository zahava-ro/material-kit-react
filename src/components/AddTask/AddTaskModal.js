import React, { useState, useEffect } from 'react';
import { Modal, Fade, Typography, TextField, Button, Stack, IconButton, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { fetchAllFromTable } from '../../utils/databaseOperations';

const AddTaskModal = ({ open, onClose, onAddTask }) => {
  useEffect(() => {
    if (open) {
      resetState();
    }
  }, [open]);

  const initialTaskState = {
    item_number: Math.floor(Math.random() * 10000), // Task ID generated based on SQL data model
    employee_id: null,
    date_entered: null,
    date_completed: null,
    type_of_activity: '',
    assigned_to: '',
    note: '',
  };

  const [task, setTask] = useState(initialTaskState);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees data from the database here
    // For now, we'll use dummyEmployees for testing purposes
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const employeesData = await fetchAllFromTable('pest_control_employees');
    setEmployees(employeesData);
  };

  const resetState = () => {
    setTask(initialTaskState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleDateChange = (date, fieldName) => {
    setTask((prevTask) => ({
      ...prevTask,
      [fieldName]: date,
    }));
  };

  const handleSubmit = () => {
    onAddTask(task);
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
              Add Task
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>
          <Stack spacing={2} sx={{ marginBottom: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="assigned-to">Assigned To</InputLabel>
              <Select
                name="assigned_to"
                value={task.assigned_to}
                onChange={handleChange}
                label="Assigned To"
                inputProps={{ id: 'assigned-to' }}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee.employee_id} value={`${employee.first_name} ${employee.last_name}`}>
                    {`${employee.first_name} ${employee.last_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date Entered"
                value={task.date_entered}
                onChange={(date) => handleDateChange(date, 'date_entered')}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
              <DateTimePicker
                label="Date Completed"
                value={task.date_completed}
                onChange={(date) => handleDateChange(date, 'date_completed')}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </LocalizationProvider>
            {/* <TextField
              name="employee_id"
              label="Employee ID"
              value={task.employee_id}
              onChange={handleChange}
              fullWidth
              size="small"
            /> */}
            <TextField
              name="type_of_activity"
              label="Type of Activity"
              value={task.type_of_activity}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              name="note"
              label="Note"
              value={task.note}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              size="small"
            />
          </Stack>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Add Task
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddTaskModal;
