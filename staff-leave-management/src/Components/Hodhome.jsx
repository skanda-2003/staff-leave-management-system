import React from 'react';
import Navbar from './HodNavbar'; // Update the import to your actual HodNavbar component
import './Home.css';

const HodHome = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to LeaveEase</h1>
        <p>
          Your go-to platform for hassle-free staff leave management. Submit and approve leave requests seamlessly, customize leave types to align with your policies, and stay informed with real-time notifications. With a user-friendly design and flexible configuration, LeaveEase ensures a smooth experience for administrators and staff alike. Experience efficient leave management – explore our features and sign up for a free trial today!
        </p>
        <p>
          Explore the features and easily manage staff leave, leave types, and more.
        </p>
      </div>
    </div>
  );
}

export default HodHome;