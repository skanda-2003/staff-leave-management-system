import React, { useState, useEffect } from 'react';
import HodNavbar from './HodNavbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

const ViewLeave = () => {
  const [arrangements, setArrangements] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState({});
  const { staffId } = useParams();

  useEffect(() => {
    fetchArrangements();
    fetchLeaveBalances();
  }, []);

  const fetchArrangements = () => {
    fetch(`http://localhost:3001/api/alternateArrangement/${staffId}`)
      .then((response) => response.json())
      .then((data) => setArrangements(data))
      .catch((error) => console.error('Error fetching arrangements:', error));
  };

  const fetchLeaveBalances = () => {
    fetch(`http://localhost:3001/api/leaveBalance/${staffId}`)
      .then((response) => response.json())
      .then((data) => {
        // Convert leave balances array to an object for easy access
        const leaveBalancesObj = {};
        data.forEach((balance) => {
          leaveBalancesObj[balance.staff_id] = balance.balance;
        });
        setLeaveBalances(leaveBalancesObj);
      })
      .catch((error) => console.error('Error fetching leave balances:', error));
  };

  const handleApproveAll = async () => {
    try {
      // Iterate through arrangements and approve each leave request
  
      const url=window.location.href;
      const staffId = url.substring(url.lastIndexOf('/') + 1);
      await approveLeave1(staffId);

      fetchArrangements(); // Refresh the arrangements after approval
      alert('Leave requests approved successfully');
    } catch (error) {
      console.error('Error approving leave:', error); // Line 52
      alert('Error approving leave. Please try again later.');
    }
  };
  
  
  
  const approveLeave1 = async (staffId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/approveLeave1/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Approved' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      throw new Error('Error approving leave:', error);
    }
  };
  

  const handleDeclineAll = async () => {
    try {
      // Iterate through arrangements and approve each leave request
  
      const url=window.location.href;
      const staffId = url.substring(url.lastIndexOf('/') + 1);
      await declineleave(staffId);

      fetchArrangements(); // Refresh the arrangements after approval
      alert('Leave requests declined successfully');
    } catch (error) {
      console.error('Error declining leave:', error); // Line 52
      alert('Error declining leave. Please try again later.');
    }
  };

 
  const declineleave = async (staffId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/declineleave/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Declined' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      throw new Error('Error declining leave:', error);
    }
  };


  return (
    <div>
      <HodNavbar />
      <h1>Alternate Arrangements</h1>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Subject / Lab Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Alternate Faculty Name</TableCell>
                <TableCell>Leave Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {arrangements.map((arrangement) => (
                <TableRow key={arrangement.arrangement_id}>
                  <TableCell>{arrangement.date}</TableCell>
                  <TableCell>{arrangement.subject_lab_name}</TableCell>
                  <TableCell>{arrangement.class}</TableCell>
                  <TableCell>{arrangement.time}</TableCell>
                  <TableCell>{arrangement.alternate_faculty_name}</TableCell>
                  <TableCell>{leaveBalances[arrangement.leave_type_id]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="button-container">
        <button onClick={handleApproveAll}>Approve</button>
        <button onClick={handleDeclineAll}>Decline</button>
      </div>
    </div>
  );
};

export default ViewLeave;