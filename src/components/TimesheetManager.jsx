import React, { useState } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import '../style/TimesheetManager.css';

function TimesheetManager({}) {
  const [employeeInfo, setEmployeeInfo] = useState({
    name: '',
    department: '',
    time: '',
    date: '',
    schedule: ''
  });    
  

  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

     // Check if all required fields are filled out
     if (!employeeInfo.name || !employeeInfo.department || !employeeInfo.time || !employeeInfo.date || !employeeInfo.schedule) {
      alert('Please fill out all fields before adding entry');
      return;
    }

    setTimesheetEntries(prevEntries => [...prevEntries, { ...employeeInfo }]);
    setEmployeeInfo({
      name: '',
      department: '',
      time: '',
      date: '',
      schedule: ''
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEmployeeInfo(timesheetEntries[index]);
  };

  const handleUpdate = () => {
    setTimesheetEntries(prevEntries => {
      const updatedEntries = [...prevEntries];
      updatedEntries[editIndex] = { ...employeeInfo };
      return updatedEntries;
    });
    setEditIndex(-1);
    setEmployeeInfo({
      name: '',
      department: '',
      time: '',
      date: '',
      schedule: ''
    });
  };

  const handleDelete = (index) => {
    setTimesheetEntries(prevEntries => prevEntries.filter((entry, i) => i !== index));
  };

  
  return (
    <Container  className="ts-container" maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Timesheet Manager
      </Typography>
      <form onSubmit={handleSubmit}>

        <TextField
          fullWidth
          label="Name"
          name="name"
          sx={{ marginBottom: '10px' }}
          value={employeeInfo.name}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            sx={{ marginBottom: '10px' }}
            value={employeeInfo.department}
            onChange={handleChange}
            required
            name="department"
          >

            <MenuItem value="ITSO 3">ITSO BLDG 3</MenuItem>
            <MenuItem value="ITSO 5">ITSO BLDG 5</MenuItem>
            {/* Add more departments as needed */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Time"
          name="time"
          type="time"
          sx={{ marginBottom: '10px' }}
          value={employeeInfo.time}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          sx={{ marginBottom: '15px' }}
          value={employeeInfo.date}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
          <FormControl fullWidth>
          <InputLabel>Schedule</InputLabel>
          <Select
            sx={{ marginBottom: '10px' }}
            value={employeeInfo.schedule}
            onChange={handleChange}
            required
            name="schedule"
          >

            <MenuItem value="Time In">Time In</MenuItem>
            <MenuItem value="Lunchbreak">Lunchbreak</MenuItem>
            <MenuItem value="Time Out">Time Out</MenuItem>
          </Select>
        </FormControl>
        
        {editIndex === -1 ? (
          <Button variant="contained" color="primary" type="submit">
            Add Entry
          </Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleUpdate}>
            Update
          </Button>
        )}

      </form>
      <br />
      <Typography variant="h5" align="center" gutterBottom>
        Timesheet Entries
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Schedule</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timesheetEntries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.department}</TableCell>
              <TableCell>{entry.time}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.schedule}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" size="small" style={{ marginTop: '15px' }} startIcon={<EditIcon />} onClick={() => handleEdit(index)}>
                  Edit
                </Button>
                <Button className="form-button" variant="outlined" color="error" size="small" style={{ marginTop: '15px' }} startIcon={<DeleteIcon />} onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>

    </Container>

  );
}

export default TimesheetManager;

