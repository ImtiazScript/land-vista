import {
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"; // Import icons
import { useState } from "react";
// import "./FilterPanel.css"; // Add the CSS for sliding animation

const FilterPanel = ({ filter, setFilter, onApplyFilter }) => {
  const [expanded, setExpanded] = useState(false);

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({ ...prev, type: value }));
  };

  const handleAvailabilityStatusChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({ ...prev, availabilityStatus: value }));
  };

  const handleOwnershipTypeChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({ ...prev, ownershipType: value }));
  };

  const handleAreaChange = (event, newValue) => {
    setFilter((prev) => ({ ...prev, areaRange: newValue }));
  };

  return (
    <>
      {!expanded && (
        <Box className="filterExpandButton">
          <IconButton
            onClick={() => setExpanded(!expanded)}
            className="icon-button-style"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
      )}

      <div className={`filterPanel ${expanded ? "expanded" : "collapsed"}`}>
        <Collapse in={expanded} orientation="horizontal">
        <FormControl margin="normal">
            <IconButton
              onClick={() => setExpanded(!expanded)}
              className="filterCollapsButton"
            >
              <ChevronLeft />
            </IconButton>
            </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              multiple
              label="Type"
              value={filter.type}
              onChange={handleTypeChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Residential">Residential</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
              <MenuItem value="Farming">Farming</MenuItem>
              <MenuItem value="Fish Farm">Fish Farm</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Availability Status</InputLabel>
            <Select
              multiple
              label="Availability Status"
              value={filter.availabilityStatus}
              onChange={handleAvailabilityStatusChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="For Sale">For Sale</MenuItem>
              <MenuItem value="For Rent">For Rent</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="Leased">Leased</MenuItem>
              <MenuItem value="Auction">Auction</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Ownership Type</InputLabel>
            <Select
              multiple
              label="Ownership Type"
              value={filter.ownershipType}
              onChange={handleOwnershipTypeChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Private">Private</MenuItem>
              <MenuItem value="Government">Government</MenuItem>
              <MenuItem value="Common">Common</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Slider
              value={filter.areaRange}
              min={500}
              max={1000}
              step={100}
              valueLabelDisplay="auto"
              onChange={handleAreaChange}
              valueLabelFormat={(value) => `${value} m`}
            />
          </FormControl>

          <Button
            onClick={() => onApplyFilter(filter)}
            variant="contained"
            fullWidth
          >
            Apply Filters
          </Button>
        </Collapse>
      </div>
    </>
  );
};

export default FilterPanel;
