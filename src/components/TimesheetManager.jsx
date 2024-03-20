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
    date: ''
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

  const handleAddEntry = () => {
    setTimesheetEntries(prevEntries => [...prevEntries, { ...employeeInfo }]);
    setEmployeeInfo({
      name: '',
      department: '',
      time: '',
      date: ''
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
      date: ''
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
      <form>

        <TextField
          fullWidth
          label="Name"
          name="name"
          sx={{ marginBottom: '10px' }}
          value={employeeInfo.name}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            sx={{ marginBottom: '10px' }}
            value={employeeInfo.department}
            onChange={handleChange}
            name="department"
          >

            <MenuItem value="ITSO 3">ITSO BLDG 3</MenuItem>
            <MenuItem value="ITSO 5">ITSO BLDG 5</MenuItem>
            {/* Add more departments as needed */}
          </Select>
        </FormControl>
        <FormControl fullWidth>
        <InputLabel>Time</InputLabel>
        <Select
          fullWidth
          label="Time"
          name="time"
          type="time"
          sx={{ marginBottom: '10px' }}
          value={employeeInfo.time}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}>
            <MenuItem value="7:00 AM">7:00 AM</MenuItem>
            <MenuItem value="8:00 AM">8:00 AM</MenuItem>
            <MenuItem value="9:00 AM">9:00 AM</MenuItem>
            <MenuItem value="1_Lunch BreakIn">Lunchbreak 12:00PM</MenuItem>
            <MenuItem value="2_Lunch BreakIn">Lunchbreak 1:00PM</MenuItem>
            <MenuItem value="3_Lunch Break">Lunchbreak 2:00PM</MenuItem>
            <MenuItem value="4:00 PM">4:00PM</MenuItem>
            <MenuItem value="5:00 PM">5:00PM</MenuItem>
            <MenuItem value="6:00 PM">6:00PM</MenuItem>
            <MenuItem value="7:00 PM">7:00PM</MenuItem>
            {/* Add more as needed */}
          </Select>
          </FormControl>
        <TextField
          fullWidth
          label="Date"
          name="date"
          type="date"
          sx={{ marginBottom: '15px' }}
          value={employeeInfo.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        {editIndex === -1 ? (
          <Button variant="contained" color="primary" onClick={handleAddEntry}>
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

