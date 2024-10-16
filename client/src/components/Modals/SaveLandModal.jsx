import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const SaveLandModal = ({ open, onClose, handleSaveLand }) => {
  const [newLandData, setNewLandData] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    availabilityStatus: '',
    ownershipType: '',
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setNewLandData({ ...newLandData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the file object
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('name', newLandData.name);
    formData.append('description', newLandData.description);
    formData.append('price', newLandData.price);
    formData.append('type', newLandData.type);
    formData.append('availabilityStatus', newLandData.availabilityStatus);
    formData.append('ownershipType', newLandData.ownershipType);
    if (image) formData.append('image', image); // Append the image file

    // console.log('formData in modal: ', formData);
      // Log the FormData content for verification
//   for (let [key, value] of formData.entries()) {
//     console.log(`${key}: ${value}`);
//   }

    handleSaveLand(formData); // Pass FormData to the parent
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
          label="Description"
          fullWidth
          margin="normal"
          name="description"
          value={newLandData.description}
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
        
        {/* Type Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select name="type" value={newLandData.type} onChange={handleInputChange}>
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Farming">Farming</MenuItem>
            <MenuItem value="Fish Farm">Fish Farm</MenuItem>
          </Select>
        </FormControl>

        {/* Availability Status Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Availability Status</InputLabel>
          <Select name="availabilityStatus" value={newLandData.availabilityStatus} onChange={handleInputChange}>
            <MenuItem value="For Sale">For Sale</MenuItem>
            <MenuItem value="For Rent">For Rent</MenuItem>
            <MenuItem value="Sold">Sold</MenuItem>
            <MenuItem value="Leased">Leased</MenuItem>
            <MenuItem value="Auction">Auction</MenuItem>
          </Select>
        </FormControl>

        {/* Ownership Type Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Ownership Type</InputLabel>
          <Select name="ownershipType" value={newLandData.ownershipType} onChange={handleInputChange}>
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Government">Government</MenuItem>
            <MenuItem value="Common">Common</MenuItem>
          </Select>
        </FormControl>

        {/* Image Upload */}
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>

        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
          Save Land
        </Button>
      </Box>
    </Modal>
  );
};

export default SaveLandModal;
