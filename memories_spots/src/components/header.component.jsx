import React from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@mui/material';
import PropTypes from 'prop-types';

const Header = ({ handleLogout }) => (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MemorySpots
        </Typography>
        <Button color="inherit">Map View</Button>
        <Button color="inherit">List View</Button>
        <Button color="inherit" onClick={handleLogout}>Deconnexion</Button>
      </Toolbar>
    </AppBar>
);

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Header;
