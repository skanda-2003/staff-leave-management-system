// AlternateArrangement.jsx

import React, { useState } from 'react';
import Navbar from './Navbar';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AlternateArrangement = () => {
  const navigate = useNavigate();

  const [arrangements, setArrangements] = useState([
    {
      date: '',
      subjectLab: '',
      classValue: '',
      time: '',
      alternateFacultyName: '',
    },
  ]);

  const handleFieldChange = (index, field, value) => {
    const updatedArrangements = [...arrangements];
    updatedArrangements[index][field] = value;
    setArrangements(updatedArrangements);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const leaveRequestId = localStorage.getItem('leaveRequestId');

    const formData = {
      leaveRequestId,
      arrangements,
    };

    try {
      const response = await fetch('http://localhost:3001/alternateArrangement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert('Alternate arrangement details submitted successfully');

        setArrangements([{ date: '', subjectLab: '', classValue: '', time: '', alternateFacultyName: '' }]);

      } else {
        alert('Error submitting alternate arrangement details: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting alternate arrangement details. Please try again later.');
    }
  };

  const handleAddFields = () => {
    setArrangements([...arrangements, { date: '', subjectLab: '', classValue: '', time: '', alternateFacultyName: '' }]);
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
          '& .submitButton, .addButton, .previousButton': {
            marginTop: '1rem',
            width: '40ch',
            backgroundColor: '#53a8b6',
            color: '#fff',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
          },
          '& .addButton': {
            backgroundColor: '#53a8b6',
            color: '#fff',
            marginLeft: '1rem',
            marginTop: '1rem',
          },
          '& .previousButton': {
            backgroundColor: '#53a8b6',
            color: '#fff',
            marginLeft: '1rem',
            marginTop: '1rem',
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {arrangements.map((arrangement, index) => (
          <div key={index}>
            <TextField
              required
              id={`date-${index}`}
              label="Date"
              type="date"
              variant="outlined"
              value={arrangement.date}
              onChange={(e) => handleFieldChange(index, 'date', e.target.value)}
              className="spacing"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              id={`subjectLab-${index}`}
              label="Subject/Lab Name"
              variant="outlined"
              value={arrangement.subjectLab}
              onChange={(e) => handleFieldChange(index, 'subjectLab', e.target.value)}
              className="spacing"
            />
            <TextField
              required
              id={`class-${index}`}
              label="Class"
              variant="outlined"
              value={arrangement.classValue}
              onChange={(e) => handleFieldChange(index, 'classValue', e.target.value)}
              className="spacing"
            />
            <TextField
              required
              id={`time-${index}`}
              label="Time"
              variant="outlined"
              value={arrangement.time}
              onChange={(e) => handleFieldChange(index, 'time', e.target.value)}
              className="spacing"
            />
            <TextField
              required
              id={`alternateFacultyName-${index}`}
              label="Alternate Faculty Name"
              variant="outlined"
              value={arrangement.alternateFacultyName}
              onChange={(e) => handleFieldChange(index, 'alternateFacultyName', e.target.value)}
              className="spacing"
            />
          </div>
        ))}
        <Button variant="contained" type="submit" className="submitButton">
          Submit
        </Button>
        <Button variant="contained" onClick={handleAddFields} className="addButton">
          Add Another Set
        </Button>
      </Box>
    </div>
  );
};

export default AlternateArrangement;