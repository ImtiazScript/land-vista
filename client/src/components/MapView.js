import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Modal, Box, Typography } from '@mui/material';

const MapView = () => {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);

  // Fetch land data from the server
  useEffect(() => {
    axios.get('/api/lands')
      .then(response => {
        setLands(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the lands!', error);
      });
  }, []);

  const handleLandClick = (land) => {
    setSelectedLand(land);
  };

  const handleCloseModal = () => {
    setSelectedLand(null);
  };
  
  const landTypeColor = (type) => {
    let colorOptions;
    switch (type) {
      case 'sell':
        colorOptions = { fillColor: 'blue' };
        break;
      case 'rent':
        colorOptions = { color: 'purple' };
        break;
      // case 'share-sell':
      //   colorOptions = { color: 'lime' };
      //   break;
      // case 'industrial':
      //   colorOptions = { color: 'purple' };
      //   break;
      // case 'not-available':
      //   colorOptions = { color: 'red' };
      //   break;
      default:
        colorOptions = { color: 'red' }; // default color
    }
    return colorOptions;
  };
  

  // Coordinates for the center of the map
  const mapCenter = [23.16053, 89.22055];

  return (
    <MapContainer center={mapCenter} zoom={19} style={{ height: '95vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {lands.map(land => {
        return (
        <Polygon
          pathOptions={landTypeColor(land.type)}
          key={land._id}
          positions={land.coordinates}
          eventHandlers={{ click: () => handleLandClick(land) }} 
          />
      )})}
      <Modal open={!!selectedLand} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 6, width: 500 }}>
          <Typography variant="h6" component="h2">{selectedLand?.name}</Typography>
          <img src={selectedLand?.imageUrl ?? '/images/place_holder.png' } alt={selectedLand?.name} style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }} />
          <Typography variant="body1" component="p">Price: ${selectedLand?.price}</Typography>
          <Typography variant="body2" component="p">{selectedLand?.description}</Typography>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </MapContainer>
  );
};

export default MapView;

