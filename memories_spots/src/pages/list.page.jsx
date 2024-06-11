import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import ListCard from '../components/listCard.component.jsx';
import '../App.css';

const ListPage = ({ selectedMemories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const souvenirsPerPage = 4;

  const totalPages = Math.ceil(selectedMemories.length / souvenirsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const startIdx = (currentPage - 1) * souvenirsPerPage;
  const currentMemories = selectedMemories.slice(startIdx, startIdx + souvenirsPerPage);

  return (
    <div className='container'>
      <br />
      <br />
      <br />
      <br />
      <div className='grid'>
        {currentMemories.map((souvenir, index) => (
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
