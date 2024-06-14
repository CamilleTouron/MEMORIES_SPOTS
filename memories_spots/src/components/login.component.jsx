import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, Grid, Typography, Container, Paper,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import userService from '../services/user.service';

const LoginComponent = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'error' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setAlert({ open: true, message: 'Passwords do not match', severity: 'error' });
        return;
      }
      if (!validatePassword(formData.password)) {
        setAlert({ open: true, message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character', severity: 'error' });
        return;
      }
      const user = userService.getUserByEmail(formData.email);
      if (user) {
        setAlert({ open: true, message: 'User already exists', severity: 'error' });
        return;
      }
      const newUser = userService.createUser(formData.email, formData.email, formData.password);
      if (newUser) {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      } else {
        setAlert({ open: true, message: 'Error creating user', severity: 'error' });
      }
    } else {
      const user = userService.verifyUser(formData.email, formData.password);
      if (user) {
        setUser(user);
      } else {
        setAlert({ open: true, message: 'Wrong credentials', severity: 'error' });
      }
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
        <Container maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography component="h1" variant="h4" align="center" style={{ marginBottom: '10px' }}>
                    Welcome to MemorySpots!
                </Typography>
                <Typography component="h2" variant="h5" style={{ marginBottom: '10px' }}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                {alert.open && <div><Alert severity={alert.severity}>{alert.message}</Alert><br/></div>}
                <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        {isSignUp && (
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end" style={{ marginTop: '10px' }}>
                        <Grid item>
                            <Button onClick={toggleSignUp}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
  );
};

LoginComponent.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginComponent;
