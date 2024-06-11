import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function AddMemoryButton() {
    return (
        <Fab color="primary" aria-label="add" className="add-memory-button">
            <AddIcon />
        </Fab>
    );
}

export default AddMemoryButton;
