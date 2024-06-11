import React from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleListView = () => {
    navigate('/list');
  };

  const handleMapView = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MemorySpots
        </Typography>
        <Button color="inherit" onClick={handleMapView}>Map View</Button>
        <Button color="inherit" onClick={handleListView}>List View</Button>
        <Button color="inherit" onClick={handleLogout}>Deconnexion</Button>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
