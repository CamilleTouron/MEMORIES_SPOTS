import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/login.page.jsx';
import Header from './components/header.component.jsx';
import Footer from './components/footer.component.jsx';
import Search from './components/search.component.jsx';
import memoryService from './services/memory.service';

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
        <div>
          <Header handleLogout={handleLogout} />
          <div className="App">
            <Search
              unableOrderBy={false}
              userId={user.id}
              setSelectedMemories={handleSelectedMemories}
              memories={memories}
            />
          </div>
          <Footer/>
        </div>
      ) : (
        <LoginPage setUser={handleLogin} />
      )}
    </div>
  );
}

export default App;
