import React, { useEffect } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/map.component.jsx';
import LoginComponent from '../components/login.component.jsx';

function LoginPage({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, []);

  return (
        <div id="container">
            <MapComponent center={[43.59797151042939, 1.5006803383228677]} height="100vh" width="100%" />
            <div id="login-overlay"><LoginComponent setUser={setUser} /></div>
        </div>
  );
}

LoginPage.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginPage;
