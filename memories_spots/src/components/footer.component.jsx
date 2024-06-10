import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      backgroundColor: '#f8f8f8',
      textAlign: 'center',
      padding: '10px 0',
    }}>
      <Typography variant="body2" color="text.secondary">
        Made with joy by Camille and Antoine 😊 &copy; 2024
      </Typography>
    </Box>
);

export default Footer;
