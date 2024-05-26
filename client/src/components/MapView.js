import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapView = () => {
    const [lands, setLands] = useState([]);
  
    useEffect(() => {
      axios.get('/api/lands')
        .then(response => {
          setLands(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the lands!', error);
        });
    }, []);
  
    return (
      <MapContainer center={[23.16053, 89.22055]} zoom={19} style={{ height: '100vh', width: '100%' }}>
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
