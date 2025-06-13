import React, { useState, useEffect } from 'react';
import HodNavbar from './HodNavbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './PendingLeave.css'; // Import your CSS file

const ApprovedLeave = () => {
  const [approvedLeaveRequests, setapprovedLeaveRequests] = useState([]);

  useEffect(() => {
    // Fetch pending leave requests when the component mounts
    fetchapprovedLeaveRequests();
  }, []);

  const fetchapprovedLeaveRequests = () => {
    // Make an API call to fetch pending leave requests
    // You can replace the URL with your actual API endpoint
    fetch('http://localhost:3001/api/approvedLeaveRequests')
      .then((response) => response.json())
      .then((data) => setapprovedLeaveRequests(data))
      .catch((error) => console.error('Error fetching approved leave requests:', error));
  };

  return (
    <div>
      <HodNavbar />
      {/* Wrap TableContainer with a div for scrolling */}
      <div className="table-container" style={{ overflowY: 'auto', maxHeight: '500px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Staff ID</TableCell>
                <TableCell>Staff Name</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approvedLeaveRequests.map((request, index) => (
                <TableRow
                  key={request.staff_id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: index % 2 === 0 ? '#bbe4e9' : 'white',
                  }}
                >
                  <TableCell>{request.staff_id}</TableCell>
                  <TableCell>{`${request.staff_name}`}</TableCell>
                  <TableCell>{request.leave_type_name}</TableCell>
                  <TableCell>{request.start_date}</TableCell>
                  <TableCell>{request.end_date}</TableCell>
                  <TableCell>{request.designation}</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ApprovedLeave;