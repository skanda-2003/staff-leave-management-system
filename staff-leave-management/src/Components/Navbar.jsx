// Navbar.jsx
import React from 'react';
import { Container, Nav, Navbar as BootstrapNavbar, NavDropdown } from 'react-bootstrap';
import LogoImage from './logo.jpeg';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleStaffClick = () => {
    navigate('/staff');
  };

  const handleLeaveTypeClick = () => {
    navigate('/leavetype');
  };

  const handleLeaveClick = () => {
    navigate('/leave');
  };

  const handleLogoutClick = () => {
    // Perform logout actions (e.g., clearing session, etc.)
    // Then, navigate to the login page
    navigate('/');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" className="navbar sticky-top">
      <Container>
        <BootstrapNavbar.Brand href="#home" className="navbar-brand" onClick={handleHomeClick}>
          <img
            alt="Your Logo"
            src={LogoImage}
            width="60"
            height="60"
            className="d-inline-block align-top rounded-circle"
          />
          {'LeaveEase'}
        </BootstrapNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={handleStaffClick}>Staff</Nav.Link>
          <Nav.Link onClick={handleLeaveTypeClick}>Leave Type</Nav.Link>
          <Nav.Link onClick={handleLeaveClick}>Leave</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Staff" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;