import React, { useState } from 'react';
import './App.css';
import LoginPage from './pages/login.page.jsx';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userFromForm) => {
    setUser(userFromForm);
  };
  const handleLogout = () => {
    setUser(null);
  };
  return (
      <div className="App">
        {user ? (
            <div>
                <h1>Welcome {user.name}</h1>
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <LoginPage setUser={handleLogin} />
        )}
      </div>
  );
}

export default App;
