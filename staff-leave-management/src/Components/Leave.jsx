// Leave.jsx

import React, { useState } from 'react';
import { Button, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Leave = () => {
  const navigate = useNavigate();
  // State for form fields
  const [staffId, setStaffId] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [sDates, setSDates] = useState('');
  const [eDates, setEDates] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');

  const handleKeyDown = (event, nextFieldId) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextField = document.getElementById(nextFieldId);
      if (nextField) {
        nextField.focus();
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      staffId,
      designation,
      department,
      sDates,
      eDates,
      leaveType,
      reason,
    };

    // Send a POST request to the server
    try {
      const response = await fetch('http://localhost:3001/leaveRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Handle the response from the server
      if (result.status === 'success') {
        alert('Leave request submitted successfully');
        localStorage.setItem('leaveRequestId', result.leaveRequestId);

        navigate('/alternate-arrangement');

        // Optionally, you can clear the form after successful submission
        setStaffId('');
        setDesignation('');
        setDepartment('');
        setSDates('');
        setEDates('');
        setLeaveType('');
        setReason('');
      } else {
        alert('Error submitting leave request: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting leave request. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: '40ch',
            borderRadius: '8px',
          },
          '& .spacing': {
            marginBottom: '2rem',
          },
          '& .dateInputs': {
            display: 'flex',
            flexDirection: 'row',
          },
          '& .reasonField': {
            marginTop: '2rem',
          },
          '& .submitButton': {
            marginTop: '2rem',
            width: '40ch',
            backgroundColor: '#53a8b6',
            color: '#fff',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            required
            id="staffId"
            label="Staff ID"
            variant="outlined"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="spacing"
          />
          <TextField
            required
            id="designation"
            label="Designation"
            variant="outlined"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="spacing"
          />
          <TextField
            required
            id="department"
            label="Department"
            variant="outlined"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="spacing"
          />
          <div className="dateInputs">
            <TextField
              required
              id="s_dates"
              label="Start Date"
              type="date"
              variant="outlined"
              value={sDates}
              onChange={(e) => setSDates(e.target.value)}
              className="spacing"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              id="e_dates"
              label="End Date"
              type="date"
              variant="outlined"
              value={eDates}
              onChange={(e) => setEDates(e.target.value)}
              className="spacing"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <TextField
            required
            id="leaveType"
            label="Leave Type"
            variant="outlined"
            select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="reasonField"
          >
            <MenuItem value="Earned Leave">Earned Leave</MenuItem>
            <MenuItem value="Casual Leave">Casual Leave</MenuItem>
            {/* Add other leave types as needed */}
          </TextField>
          <TextField
            required
            id="reason"
            label="Reason for leave"
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="reasonField"
          />
          <Button variant="contained" type="submit" className="submitButton">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Leave;