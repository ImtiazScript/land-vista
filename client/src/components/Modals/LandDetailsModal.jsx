import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const LandDetailsModal = ({ open, onClose, land }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">{land?.name}</Typography>
        <img
          src={land?.imageUrl || '/images/place_holder.png'}
          alt={land?.name}
          style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }}
        />
        <Typography variant="body1">Price: ${land?.price}</Typography>
        <Typography variant="body2">{land?.description}</Typography>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default LandDetailsModal;
