import React, { useState } from 'react';
import { Box, TextField, MenuItem, ListItemText } from '@mui/material';
import axios from 'axios';

const SearchBox = ({ onSearchResultClick }) => {
  const [searchQuery, setSearchQuery] = useState('');  // Local search query state
  const [searchResults, setSearchResults] = useState([]); // Local search results state

  // Handle live search as the user types
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.trim()) {
      fetchSearchResults(event.target.value);
    } else {
      setSearchResults([]);
    }
  };

  // Perform search based on the query
  const fetchSearchResults = (query) => {
    if (query.length < 4) return;

    const searchUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=${encodeURIComponent(query)}&maxLocations=10&countryCode=BD&f=json`;

    axios.get(searchUrl)
      .then((response) => {
        const candidates = response.data.candidates;
        if (candidates && candidates.length > 0) {
          setSearchResults(candidates);
        } else {
          setSearchResults([]);
        }
      })
      .catch((error) => {
        console.error('Error performing geocode search', error);
        setSearchResults([]);
      });
  };

  return (
    <Box className="searchBox">
      <TextField
        placeholder="Search Location"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        sx={{ width: '100%' }}
        autoComplete="off"
      />

      {/* Dropdown for search suggestions */}
      {searchResults.length > 0 && (
        <Box sx={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', width: '300px', backgroundColor: 'white', zIndex: 1000, boxShadow: 2 }}>
          {searchResults.map((result, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setSearchResults([]);
                onSearchResultClick(result.location)
              }}
            >
              <ListItemText primary={result.address} />
            </MenuItem>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBox;
