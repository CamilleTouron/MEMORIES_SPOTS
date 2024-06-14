import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login.page.jsx';
import memoryService from './services/memory.service';
import MapViewPage from './pages/map.view.page.jsx';
import ListPage from './pages/list.page.jsx';
import Search from './components/search.component.jsx';
import Header from './components/header.component.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [selectedMemories, setSelectedMemories] = useState([]);
  const [memories, setMemories] = useState([]);

  if (user === null) {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }

  useEffect(() => {
    if (user && memories.length === 0) {
      setMemories(memoryService.getMemoriesByUserId(user.id));
      setSelectedMemories(memories);
    }
  }, [user]);

  useEffect(() => {
    setSelectedMemories(memories);
    localStorage.setItem('memories', JSON.stringify(memories));
  }, [memories]);

  const handleSelectedMemories = (newSelectedMemories) => {
    setSelectedMemories(newSelectedMemories);
  };

  const handleSetMemories = (newMemories) => {
    setMemories(newMemories);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.pathname = '/';
  };

  return (
      <div className="App">
      <Router>
        <Routes>
          {user ? (
              <>
                <Route path="/" element={
                  <>
                    <Header handleLogout={handleLogout} />
                  <MapViewPage
                        setUser={setUser}
                        user={user}
                        setSelectedMemories={setSelectedMemories}
                        setMemories={handleSetMemories}
                        memories={memories}
                        selectedMemories={selectedMemories}
                    />
                    </>
                  }
                  />
              <Route path="/list" element={
                <>
                  <Header handleLogout={handleLogout} />
                  <Search
                      unableOrderBy={false}
                      setSelectedMemories={handleSelectedMemories}
                      memories={memories} />
                  <ListPage
                      selectedMemories={selectedMemories}
                      setUser={setUser}
                      user={user}
                      setMemories={handleSetMemories}
                  />
                </>
              }
              />
              </>
          ) : (
              <>
            <Route path="/" element={<LoginPage setUser={setUser} />} />
        </>
          )}
      </Routes>
      </Router>
      </div>
  );
}

export default App;
