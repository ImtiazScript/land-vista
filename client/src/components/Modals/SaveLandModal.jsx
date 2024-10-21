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

  const handleSave = async () => {
    // Step 1: Check browser storage for user_id
    const websiteData = JSON.parse(localStorage.getItem('landVistaData')) || {};
    let userId = websiteData.user_id;

    // Step 2: If user_id not found, create a new user
    if (!userId) {
      const response = await fetch('https://api-land-vista.vercel.app/api/users/create', { method: 'POST' });
      const data = await response.json();
      userId = data.user_id;

      // Step 3: Save the new user_id in browser storage
      websiteData.user_id = userId;
      localStorage.setItem('landVistaData', JSON.stringify(websiteData));
    }
    const formData = new FormData();
    formData.append('name', newLandData.name);
    formData.append('description', newLandData.description);
    formData.append('price', newLandData.price);
    formData.append('type', newLandData.type);
    formData.append('availabilityStatus', newLandData.availabilityStatus);
    formData.append('ownershipType', newLandData.ownershipType);
    formData.append('user_id', userId);
    if (image) formData.append('image', image); // Append the image file

    handleSaveLand(formData); // Pass FormData to the parent
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
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

        {/* Type Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            name="type"
            value={newLandData.type}
            onChange={handleInputChange}
          >
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
            <MenuItem value="Farming">Farming</MenuItem>
            <MenuItem value="Fish Farm">Fish Farm</MenuItem>
          </Select>
        </FormControl>

        {/* Availability Status Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Availability Status</InputLabel>
          <Select
            label="Availability Status"
            name="availabilityStatus"
            value={newLandData.availabilityStatus}
            onChange={handleInputChange}
          >
            <MenuItem value="For Sale">For Sale</MenuItem>
            <MenuItem value="For Rent">For Rent</MenuItem>
            <MenuItem value="Sold">Sold</MenuItem>
            <MenuItem value="Leased">Leased</MenuItem>
            <MenuItem value="Auction">Auction</MenuItem>
          </Select>
        </FormControl>

        {(newLandData.availabilityStatus === "For Sale" || newLandData.availabilityStatus === "For Rent") && (
          <TextField
            label={newLandData.availabilityStatus === "For Sale" ? 'Price' : 'Monthly Rent'}
            fullWidth
            margin="normal"
            name="price"
            value={newLandData.price}
            onChange={handleInputChange}
          />
        )}

        {/* Ownership Type Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Ownership Type</InputLabel>
          <Select
            label="Ownership Type"
            name="ownershipType"
            value={newLandData.ownershipType}
            onChange={handleInputChange}
          >
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Government">Government</MenuItem>
            <MenuItem value="Common">Common</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Button
            variant="outlined"
            component="label"
            sx={{
              marginTop: "7px",
              fontSize: "16px",
              width: "100%",
            }}
          >
            Choose Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </Button>
          {image && (
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              {image.name}
            </Typography>
          )}
        </FormControl>

        {/* Save Button Aligned to the Right */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose} // This will close the modal when Cancel is clicked
            sx={{ marginRight: "8px" }} // Space between Cancel and Save buttons
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Land
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SaveLandModal;
