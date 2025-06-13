// AddStaff.jsx

import React, { useState } from 'react';
import { Button, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from './Navbar';

const AddStaff = () => {
  // State for form fields
  const [staffId, setStaffId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      staffId,
      firstName,
      lastName,
      email,
      department,
      hireDate,
      gender,
      contactNumber,
    };

    // Send a POST request to the server
    try {
      const response = await fetch('http://localhost:3001/addStaff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Handle the response from the server
      if (result.status === 'success') {
        alert('Staff added successfully');
      } else {
        alert('Error adding staff: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding staff. Please try again later.');
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
            fontSize: '16px', // Adjust the font size as needed
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
            fontSize: '18px', // Adjust the font size as needed
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
            id="firstName"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="spacing"
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="spacing"
          />
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="spacing"
          />
          <TextField
            required
            id="department"
            label="Department"
            variant="outlined"
            select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="spacing"
          >
            <MenuItem value="">Select Department</MenuItem>
            <MenuItem value="CS">CS</MenuItem>
            {/* Add more departments as needed */}
          </TextField>
          <TextField
            required
            id="hireDate"
            label="Hire Date"
            variant="outlined"
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            className="spacing"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            id="gender"
            label="Gender"
            variant="outlined"
            select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="spacing"
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            {/* Add more genders as needed */}
          </TextField>
          <TextField
            required
            id="contactNumber"
            label="Contact Number"
            variant="outlined"
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="spacing"
          />
          {/* ... (other TextField components) ... */}
          <Button variant="contained" type="submit" className="submitButton">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddStaff;