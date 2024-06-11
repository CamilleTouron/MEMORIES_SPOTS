import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import Header from '../components/header.component.jsx';
import Footer from '../components/footer.component.jsx';
import Search from '../components/search.component.jsx';
import MapComponent from '../components/map.component.jsx';

function MapViewPage({
  user, setSelectedMemories, memories, handleLogout, selectedMemories,
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);
  const [center, setCenter] = useState([48.85972899909437, 2.3435984947829924]);
  const [zoom, setZoom] = useState(11);
  const [mostPopularCity, setMostPopularCity] = useState('Toulouse');
  const [numberOfMemoriesFilteredByCity, setNumberOfMemoriesFilteredByCity] = useState(0);

  useEffect(() => {
    if (selectedMemories && selectedMemories.length > 0) {
      setCenter([selectedMemories[0].latitude, selectedMemories[0].longitude]);
    }
    if (memories && memories.length > 0) {
      setMostPopularCity(memories.reduce((acc, memory) => {
        acc[memory.city] = acc[memory.city] ? acc[memory.city] + 1 : 1;
        return acc;
      }, {}));

      setNumberOfMemoriesFilteredByCity(memories.reduce((acc, memory) => {
        acc[memory.city] = acc[memory.city] ? acc[memory.city] + 1 : 1;
        return acc;
      }));
    }

    if (numberOfMemoriesFilteredByCity > 10) {
      setZoom(13.5);
    }
  }, [mostPopularCity, memories]);

  return (
  <div className="App">
    <Header handleLogout={handleLogout}/>
    <div className="map-view">
      <div className="search-component">
        <Search
          unableOrderBy={true}
          userId={user.id}
          setSelectedMemories={setSelectedMemories}
          memories={memories}
        />
      </div>
      <div className="map-component">
        <MapComponent
          height="100vh"
          width="100%"
          zoom={zoom}
          center={center}
          memories={memories}
          selectedMemories={selectedMemories}
        />
      </div>
    </div>
    <Footer/>
  </div>
  );
}

MapViewPage.propTypes = {
  user: PropTypes.object.isRequired,
  setSelectedMemories: PropTypes.func.isRequired,
  memories: PropTypes.array.isRequired,
  handleLogout: PropTypes.func.isRequired,
  selectedMemories: PropTypes.array.isRequired,
};

export default MapViewPage;
