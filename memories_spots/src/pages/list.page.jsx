import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import ListCard from '../components/listCard.component.jsx';
import '../App.css';
import Footer from '../components/footer.component.jsx';
import AddMemoryButton from '../components/create.button.component.jsx';
import MemoryForm from '../components/create.form.component.jsx';

const ListPage = ({ selectedMemories, user, setMemories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMemories, setCurrentMemories] = useState([]);
  const [displayOpen, setDisplayOpen] = useState(false);
  const [memoryToDisplay, setMemoryToDisplay] = useState(null);
  const souvenirsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const startIdx = (currentPage - 1) * souvenirsPerPage;
    setCurrentMemories(selectedMemories.slice(startIdx, startIdx + souvenirsPerPage));
  }, [selectedMemories, currentPage]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  const totalPages = Math.ceil(selectedMemories.length / souvenirsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handleClose = () => {
    setDisplayOpen(false);
  };

  const handleDisplayMemory = (memoryId) => {
    const memory = currentMemories.find((m) => m.id === memoryId);
    setMemoryToDisplay(memory);
    setDisplayOpen(true);
  };
  const handleInterDisplayMemory = (memoryId) => () => {
    if (!displayOpen) {
      handleDisplayMemory(memoryId);
    }
  };

  return (
      <div>
          <div className='container'>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <div className='grid'>
                  {currentMemories.map((souvenir, index) => (
                      <ListCard
                          key={index}
                          title={souvenir.title}
                          date={souvenir.date}
                          description={souvenir.description}
                          rating={souvenir.note}
                          onClick={handleInterDisplayMemory(souvenir.id)}
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
          <AddMemoryButton setMemories={setMemories}/>
          <Dialog open={displayOpen} onClose={handleClose} fullWidth maxWidth="sm">
              <MemoryForm
                  selectedMemories={selectedMemories}
                  isDisplayMode={true}
                  handleClose={handleClose}
                  memory={memoryToDisplay}
              />
          </Dialog>
        <Footer/>
    </div>
  );
};

ListPage.propTypes = {
  selectedMemories: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setMemories: PropTypes.func.isRequired,
};

export default ListPage;
