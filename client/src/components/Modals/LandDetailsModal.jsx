import React from 'react';
import { Modal, Box, Typography, Button, Grid, IconButton } from '@mui/material';
import { Close as CloseIcon, AttachMoney as PriceIcon, Home as OwnershipIcon, CheckCircle as StatusIcon } from '@mui/icons-material';

const LandDetailsModal = ({ open, onClose, land }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 350, sm: 500 }, // Responsive width for mobile and larger screens
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Close Button */}
        <IconButton 
          sx={{ position: 'absolute', top: 8, right: 8 }} 
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        
        {/* Title and Image */}
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>{land?.name}</Typography>
        <img
          src={land?.imageUrl || '/images/place_holder.png'}
          alt={land?.name}
          style={{ width: '100%', height: 'auto', maxHeight: '300px', marginBottom: '15px', borderRadius: '8px' }}
        />
        
        {/* Grid for Information */}
        <Grid container spacing={2}>
          {/* Price (Display if for sale) */}
          {land?.type === 'For Sale' && (
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <PriceIcon sx={{ mr: 1, color: 'green' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                ${land?.price?.toLocaleString()}
              </Typography>
            </Grid>
          )}
          
          {/* Availability Status */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <StatusIcon sx={{ mr: 1, color: land?.availabilityStatus === 'For Rent' ? 'blue' : 'green' }} />
            <Typography variant="body1">{land?.availabilityStatus}</Typography>
          </Grid>

          {/* Ownership Type */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <OwnershipIcon sx={{ mr: 1 }} />
            <Typography variant="body1">{land?.ownershipType}</Typography>
          </Grid>

          {/* Land Type */}
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Type: </Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>{land?.type}</Typography>
          </Grid>
        </Grid>

        {/* Description */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>Description</Typography>
          <Typography variant="body2">{land?.description || 'No description available'}</Typography>
        </Box>
        
        {/* Close Button */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onClose} 
          fullWidth 
          sx={{ mt: 3 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default LandDetailsModal;
