import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Button, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';

const EditStaff = () => {
  const navigate = useNavigate();
  const { staffId } = useParams();

  const [staffDetails, setStaffDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    hireDate: '',
    gender: '',
    contactNumber: '',
  });

  useEffect(() => {
    // Fetch staff details based on staffId when component mounts
    const apiUrl = `http://localhost:3001/api/staff/${staffId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setStaffDetails(data[0])) // Assuming the API returns an array with one object
      .catch((error) => console.error('Error fetching staff details:', error));
  }, [staffId]);

  const fetchDepartmentId = async (departmentName) => {
    try {
      const response = await fetch(`http://localhost:3001/api/department/${departmentName}`);
      const result = await response.json();

      if (result.length > 0) {
        return result[0].dept_id;
      } else {
        console.error('Department not found:', departmentName);
        return null;
      }
    } catch (error) {
      console.error('Error fetching department ID:', error);
      return null;
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    // Fetch dept_id before updating staff details
    const deptId = await fetchDepartmentId(staffDetails.department);

    if (deptId !== null) {
      // Update staffDetails with the fetched dept_id
      const updatedStaffDetails = { ...staffDetails, department: deptId };

      // Send a PUT request to update staff details
      try {
        const response = await fetch(`http://localhost:3001/editStaff/${staffId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedStaffDetails),
        });

        const result = await response.json();

        // Handle the response from the server
        if (result.status === 'success') {
          alert('Staff details updated successfully');
          navigate('/staff'); // Redirect to staff page after successful update
        } else {
          alert('Error updating staff details: ' + result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating staff details. Please try again later.');
      }
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
          textAlign: 'center', // Center the form elements
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleEditSubmit}
      >
        <div>
          <TextField
            required
            id="staffId"
            label="Staff ID"
            variant="outlined"
            value={staffDetails.staffId}
            disabled
          />
          <TextField
            required
            id="firstName"
            label="First Name"
            variant="outlined"
            value={staffDetails.firstName}
            onChange={(e) => setStaffDetails({ ...staffDetails, firstName: e.target.value })}
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={staffDetails.lastName}
            onChange={(e) => setStaffDetails({ ...staffDetails, lastName: e.target.value })}
          />
          <TextField
            required
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            value={staffDetails.email}
            onChange={(e) => setStaffDetails({ ...staffDetails, email: e.target.value })}
          />
          <TextField
            required
            id="department"
            label="Department"
            variant="outlined"
            select
            value={staffDetails.department}
            onChange={(e) => setStaffDetails({ ...staffDetails, department: e.target.value })}
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
            value={staffDetails.hireDate}
            onChange={(e) => setStaffDetails({ ...staffDetails, hireDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            id="gender"
            label="Gender"
            variant="outlined"
            select
            value={staffDetails.gender}
            onChange={(e) => setStaffDetails({ ...staffDetails, gender: e.target.value })}
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
            value={staffDetails.contactNumber}
            onChange={(e) => setStaffDetails({ ...staffDetails, contactNumber: e.target.value })}
          />
          <Button variant="contained" type="submit"  sx={{ backgroundColor: '#53a8b6', mt: 2 }} >
            Save Changes
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default EditStaff;