import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from './Navbar';

function createData(slNo, leaveType, description) {
  return { slNo, leaveType, description };
}

const rows = [
  createData(1, 'Earned Leave', 'Time off for relaxation, accrued based on work tenure.'),
  createData(2, 'Casual Leave', 'Unplanned personal absence for various reasons.'),
  createData(3, 'On Official Duty Leave', 'Authorized absence for work-related tasks.'),
  createData(4, 'Compensatory Off Leave', 'Time off granted for overtime worked.'),
  createData(5, 'Reserved Holiday Leave', 'Leave on designated reserved holidays.'),
  // Add more rows as needed
];


export default function LeaveType() {
  return (
    <div>
      <Navbar />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.slNo}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: index % 2 === 0 ? '#bbe4e9' :'white', // Alternating background colors
                }}
              >
                <TableCell component="th" scope="row">
                  {row.slNo}
                </TableCell>
                <TableCell>{row.leaveType}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
