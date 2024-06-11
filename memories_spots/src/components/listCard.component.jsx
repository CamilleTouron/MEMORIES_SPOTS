import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import '../App.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const listCard = ({ title, date, description }) => {
  const formattedDate = formatDate(date);

  return (
    <Paper elevation={3} className="list-card">
      <Box mb={2}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1">{formattedDate}</Typography>
      </Box>
      <Typography variant="body1">{description}</Typography>
  </Paper>
  );
};

export default listCard;
