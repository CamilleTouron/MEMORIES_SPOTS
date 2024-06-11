import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/login.page.jsx';
import memoryService from './services/memory.service';
import MapViewPage from './pages/map.view.page.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [selectedMemories, setSelectedMemories] = useState([]);
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    if (user) {
      setMemories(memoryService.getMemoriesByUserId(user.id));
    }
  }, [user]);

  useEffect(() => {
    console.log(selectedMemories);
  }, [selectedMemories]);

  const handleLogin = (userFromForm) => {
    setUser(userFromForm);
  };
  const handleLogout = () => {
    setUser(null);
  };
  const handleSelectedMemories = (newSelectedMemories) => {
    setSelectedMemories(newSelectedMemories);
  };

  return (
    <div className="App">
      {user ? (
        <MapViewPage handleLogout={handleLogout} user={user} setSelectedMemories={handleSelectedMemories} memories={memories} selectedMemories={selectedMemories}/>
      ) : (

        <LoginPage setUser={handleLogin} />
      )}
    </div>
  );
}

export default App;
