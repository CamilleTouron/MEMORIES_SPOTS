import React, { useState } from 'react';
import {
  TextField, Button, IconButton, Grid, Typography, Dialog, DialogContent, styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const MemoryForm = ({
  memory, onSubmit, isDisplayMode, handleClose, setSnackbarMessage, setOpenSnackbar,
}) => {
  const [formMemory, setFormMemory] = useState(memory || {
    title: '',
    description: '',
    date: '',
    longitude: '',
    latitude: '',
    note: 0,
    city: '',
  });

  const handleChange = (event) => {
    setFormMemory({
      ...formMemory,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formMemory);
    setSnackbarMessage('New memory created');
    setOpenSnackbar(true);
    handleClose();
  };

  const handleCloseCross = () => {
    setSnackbarMessage('Create canceled');
    setOpenSnackbar(true);
    handleClose();
  };

  return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <IconButton edge="end" color="inherit" onClick={handleCloseCross} aria-label="close">
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {!isDisplayMode ? (
                  <>
                    <Grid item xs={12} fullWidth>
                      <Typography variant="h5" align="center">Create a new memory</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth name="title" value={formMemory.title} onChange={handleChange} label="Title" required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth name="description" value={formMemory.description} onChange={handleChange} label="Description" required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth name="date" value={formMemory.date} onChange={handleChange} label="Date" type="date" InputLabelProps={{ shrink: true }} required />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth name="longitude" value={formMemory.longitude} onChange={handleChange} label="Longitude" required />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth name="latitude" value={formMemory.latitude} onChange={handleChange} label="Latitude" required />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth name="city" value={formMemory.city} onChange={handleChange} label="City" required />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledRating
                          name="highlight-selected-only"
                          defaultValue={4}
                          IconContainerComponent={IconContainer}
                          getLabelText={(value) => customIcons[value].label}
                          highlightSelectedOnly
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth variant="contained" color="primary" type="submit">Submit</Button>
                    </Grid>
                  </>
              ) : (
                  <>
                    <Grid item xs={12} fullWidth>
                      <Typography variant="h5" align="center">Memory details</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h5">{formMemory.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{formMemory.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{formMemory.date}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">{formMemory.longitude}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">{formMemory.latitude}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">{formMemory.city}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledRating
                          name="highlight-selected-only"
                          defaultValue={2}
                          IconContainerComponent={IconContainer}
                          getLabelText={(value) => customIcons[value].label}
                          highlightSelectedOnly
                          readOnly
                      />
                    </Grid>
                  </>
              )}
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
  );
};

MemoryForm.propTypes = {
  memory: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    longitude: PropTypes.string,
    latitude: PropTypes.string,
    note: PropTypes.number,
    city: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isDisplayMode: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  setSnackbarMessage: PropTypes.func.isRequired,
  setOpenSnackbar: PropTypes.func.isRequired,
};

export default MemoryForm;
