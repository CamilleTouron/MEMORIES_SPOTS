import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login.page.jsx';
import memoryService from './services/memory.service';
import MapViewPage from './pages/map.view.page.jsx';
import ListPage from './pages/list.page.jsx';
import Header from './components/header.component.jsx';
import Footer from './components/footer.component.jsx';
import Search from './components/search.component.jsx';

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
    <Router>
      <div className="App">
        {user ? (
          <div>
            <Header handleLogout={handleLogout} />
            <div className="App">
              <Routes>
                <Route path="/" element={
                    <MapViewPage user={user} setSelectedMemories={handleSelectedMemories} memories={memories} selectedMemories={selectedMemories}/>
                }
                />
                <Route path="/list" element={
                  <>
                    <Search
                      unableOrderBy={false}
                      userId={user.id}
                      setSelectedMemories={handleSelectedMemories}
                      memories={memories} />
                    <ListPage
                      selectedMemories={selectedMemories} />
                  </>
                }
                />
              </Routes>
            </div>
            <Footer/>
          </div>
        ) : (
          <LoginPage setUser={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
