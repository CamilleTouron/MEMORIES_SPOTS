import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import ListCard from '../components/listCard.component.jsx';
import memoryService from '../services/memory.service';
import userService from '../services/user.service';
import '../App.css';

const userId = userService.getUserId();

const ListPage = ({ selectedMemories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const souvenirsPerPage = 4;
  const [souvenirs, setSouvenirs] = useState([]);

  useEffect(() => {
    const fetchMemories = async () => {
      const memories = await memoryService.getMemoriesByUserId(userId); // Assuming this is an async function
      setSouvenirs(memories);
    };

    fetchMemories();
  }, []);

  const totalPages = Math.ceil(souvenirs.length / souvenirsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <div className='container'>
      <div className='grid'>
        {selectedMemories.map((souvenir, index) => (
          <ListCard
            key={index}
            title={souvenir.title}
            date={souvenir.date}
            description={souvenir.description}
          />
        ))}
      </div>
      <div className='pagination'>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{currentPage} / {totalPages}</span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

ListPage.propTypes = {
  selectedMemories: PropTypes.array.isRequired,
};

export default ListPage;
