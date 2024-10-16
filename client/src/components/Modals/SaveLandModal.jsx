import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const SaveLandModal = ({ open, onClose, handleSaveLand }) => {
  const [newLandData, setNewLandData] = useState({ name: '', imageUrl: '', price: '', type: '' });

  const handleInputChange = (e) => {
    setNewLandData({ ...newLandData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    handleSaveLand(newLandData); // Pass the land data to the parent
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Enter Land Details</Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          name="name"
          value={newLandData.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Image URL"
          fullWidth
          margin="normal"
          name="imageUrl"
          value={newLandData.imageUrl}
          onChange={handleInputChange}
        />
        <TextField
          label="Price"
          fullWidth
          margin="normal"
          name="price"
          value={newLandData.price}
          onChange={handleInputChange}
        />
        <TextField
          label="Type"
          fullWidth
          margin="normal"
          name="type"
          value={newLandData.type}
          onChange={handleInputChange}
        />

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Land
        </Button>
      </Box>
    </Modal>
  );
};

export default SaveLandModal;
