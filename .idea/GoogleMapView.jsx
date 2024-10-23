import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Modal, Box, Typography } from '@mui/material';
import { GoogleMap, LoadScript, Polygon, InfoWindow } from '@react-google-maps/api';

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

  const googleMapCenter = { lat: 23.16053, lng: 89.22055 };
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAP_API_KEY">
      <GoogleMap
        mapContainerStyle={{ height: '95vh', width: '100%' }}
        center={googleMapCenter}
        zoom={19}
      >
        {lands.map(land => (
          <Polygon
            key={land._id}
            paths={land.coordinates.map(coord => ({ lat: coord[0], lng: coord[1] }))}
            options={landTypeColor(land.type)}
            onClick={() => handleLandClick(land)}
          />
        ))}

        {selectedLand && (
          <InfoWindow
            position={{ lat: selectedLand.coordinates[0][0], lng: selectedLand.coordinates[0][1] }}
            onCloseClick={handleCloseModal}
          >
            <div>
              <h6>{selectedLand.name}</h6>
              <img src={selectedLand.imageUrl ?? '/images/place_holder.png'} alt={selectedLand.name} style={{ maxWidth: '100%', maxHeight: '100px' }} />
              <p>Price: ${selectedLand.price}</p>
              <p>{selectedLand.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Modal for displaying land details */}
      <Modal open={!!selectedLand} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 6, width: 500 }}>
          <Typography variant="h6">{selectedLand?.name}</Typography>
          <img src={selectedLand?.imageUrl ?? '/images/place_holder.png'} alt={selectedLand?.name} style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }} />
          <Typography variant="body1">Price: ${selectedLand?.price}</Typography>
          <Typography variant="body2">{selectedLand?.description}</Typography>
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </LoadScript>
  );
};

export default MapView;

