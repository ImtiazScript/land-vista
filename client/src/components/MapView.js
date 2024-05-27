import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const [lands, setLands] = useState([]);

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

  // Coordinates for the center of the map
  const mapCenter = [23.16053, 89.22055];

  return (
    <MapContainer center={mapCenter} zoom={19} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {lands.map(land => (
        <Polygon key={land._id} positions={land.coordinates}>
          <Popup>
            <strong>{land.name}</strong><br />
            Price: ${land.price}<br />
            {land.description}
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  );
};

export default MapView;

