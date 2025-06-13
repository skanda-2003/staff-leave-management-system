import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from './HodNavbar';
import './StaffPage.css';
import { useNavigate } from 'react-router-dom';
import Hodedit from './Hodedit';

export default function StaffPage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const apiUrl = 'http://localhost:3001/api/staff';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleAddStaff = () => {
    navigate('/addstaff');
  };

  const handleEditStaff = (staffId) => {
    navigate(`/Hodedit/${staffId}`);
  };

  const handleDeleteStaff = (staffId) => {
    const apiUrl = `http://localhost:3001/deleteStaff/${staffId}`;

    fetch(apiUrl,{
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Delete response:', data);
        fetchData(); // Refresh the data after deletion
      })
      .catch((error) => {
        console.error('Error deleting staff:', error);
        // Handle the error
      });
  };

  return (
    <div>
      <Navbar />
      {/* Wrap TableContainer with a div for scrolling */}
      <div className="table-container" style={{ overflowY: 'auto', maxHeight: '500px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Staff ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.staff_id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: index % 2 === 0 ? '#bbe4e9' : 'white',
                  }}
                >
                  <TableCell>{row.staff_id}</TableCell>
                  <TableCell>{row.F_name}</TableCell>
                  <TableCell>{row.L_name}</TableCell>
                  <TableCell>{row.Gender}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.contact_number}</TableCell>
                  <TableCell align="center">
                  <button className="action-button" onClick={() => handleEditStaff(row.staff_id)}>
                    Edit
                    </button>

                    <button className="action-button" onClick={() => handleDeleteStaff(row.staff_id)}>
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="add-staff-button-container">
        <button className="add-staff-button" onClick={handleAddStaff}>
          Add Staff
        </button>
      </div>
    </div>
  );
}