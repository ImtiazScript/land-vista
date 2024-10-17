import { Collapse, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Slider, Button } from "@mui/material";
import { useState } from "react";

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
    <div className="filterPanel">
      <Button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Collapse Filters" : "Expand Filters"}
      </Button>
      <Collapse in={expanded}>
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

        <Button onClick={() => onApplyFilter(filter)} variant="contained" fullWidth>
          Apply Filters
        </Button>
      </Collapse>
    </div>
  );
};

export default FilterPanel;
