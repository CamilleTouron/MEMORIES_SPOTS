import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import { Alert, Snackbar } from '@mui/material';
import MemoryForm from './create.form.component.jsx';

function AddMemoryButton() {
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // handle the submission of the form
    // you might want to add the new memory to your state here
    handleClose();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
        <>
            <Fab color="primary" aria-label="add" className="add-memory-button" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <MemoryForm onSubmit={handleSubmit} isDisplayMode={false} handleClose={handleClose} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage}/>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
  );
}

export default AddMemoryButton;
