import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Select, MenuItem, InputLabel, FormControl, Autocomplete,
} from '@mui/material';
import PropTypes from 'prop-types';

const SearchComponent = ({
  unableOrderBy, setSelectedMemories, memories,
}) => {
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleSearchChange = (event, newValue) => {
    setSearchTerm(newValue);
  };

  useEffect(() => {
    let memoriesCandidates = memories;
    setCities([...new Set(memories.map((memory) => memory.city))]);
    if (filter) {
      memoriesCandidates = memoriesCandidates.filter((memory) => memory.city === filter);
    }
    if (searchTerm) {
      memoriesCandidates = memoriesCandidates.filter((memory) => memory.title.toLowerCase() === searchTerm.toLowerCase());
    }
    switch (orderBy) {
      case 'date ascendant':
        memoriesCandidates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date descendant':
        memoriesCandidates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'note ascendant':
        memoriesCandidates.sort((a, b) => a.note - b.note);
        break;
      case 'note descendant':
        memoriesCandidates.sort((a, b) => b.note - a.note);
        break;
      case null:
      default:
        break;
    }
    setSelectedMemories(memoriesCandidates);
  }, [filter, orderBy, memories, searchTerm]);

  return (
    <Box className="search-box">
      <Autocomplete
        options={memories.map((memory) => memory.title)}
        freeSolo
        onChange={handleSearchChange}
        renderInput={(params) => (
          <TextField {...params} label="Search by title" variant="outlined" />
        )}
      />
      <FormControl variant="outlined">
        <InputLabel id="filter-label">Filter by city</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={handleFilterChange}
          label="Filter by city"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {cities.map((city) => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {!unableOrderBy && (
        <FormControl variant="outlined">
          <InputLabel id="order-by-label">Order by</InputLabel>
          <Select
            labelId="order-by-label"
            value={orderBy}
            onChange={handleOrderByChange}
            label="Order by"
          >
            <MenuItem value='date ascendant'>Date ascendant</MenuItem>
            <MenuItem value='date descendant'>Date descendant</MenuItem>
              <MenuItem value='note ascendant'>Note ascendant</MenuItem>
              <MenuItem value='note descendant'>Note descendant</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

SearchComponent.propTypes = {
  unableOrderBy: PropTypes.bool,
  setSelectedMemories: PropTypes.func.isRequired,
  memories: PropTypes.array.isRequired,
};

export default SearchComponent;
