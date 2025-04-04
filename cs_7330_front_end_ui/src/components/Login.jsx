// Login.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Grid,
  IconButton
} from '@mui/material';
import { 
  Google as GoogleIcon, 
  Facebook as FacebookIcon 
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // TODO: Implement actual login logic
    console.log('Logging in with:', formData);
    
    // Navigate to home page after successful login
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
          
          <Box sx={{ mt: 3, width: '100%' }}>
            <Divider>OR</Divider>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <IconButton sx={{ mr: 1 }}>
                <GoogleIcon />
              </IconButton>
              <IconButton>
                <FacebookIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

// Register.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    country_of_birth: '',
    country_of_residence: '',
    age: '',
    gender: '',
    password: '',
    confirm_password: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.country_of_birth) newErrors.country_of_birth = 'Country of birth is required';
    if (!formData.country_of_residence) newErrors.country_of_residence = 'Country of residence is required';
    
    if (formData.age) {
      const age = parseInt(formData.age, 10);
      if (isNaN(age) || age < 13 || age > 120) {
        newErrors.age = 'Please enter a valid age between 13 and 120';
      }
    } else {
      newErrors.age = 'Age is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // TODO: Implement actual registration logic
    console.log('Registering with:', formData);
    
    // Navigate to home page after successful registration
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, mb: 4, p: 4 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          Create an Account
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                id="gender"
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                error={!!errors.gender}
                helperText={errors.gender}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="country_of_birth"
                label="Country of Birth"
                name="country_of_birth"
                value={formData.country_of_birth}
                onChange={handleChange}
                error={!!errors.country_of_birth}
                helperText={errors.country_of_birth}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="country_of_residence"
                label="Country of Residence"
                name="country_of_residence"
                value={formData.country_of_residence}
                onChange={handleChange}
                error={!!errors.country_of_residence}
                helperText={errors.country_of_residence}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
                InputProps={{ inputProps: { min: 13, max: 120 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                id="social_media"
                label="Social Media Platform"
                name="social_media"
                value={formData.social_media || ''}
                onChange={handleChange}
              >
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="instagram">Instagram</MenuItem>
                <MenuItem value="twitter">Twitter</MenuItem>
                <MenuItem value="linkedin">LinkedIn</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                error={!!errors.confirm_password}
                helperText={errors.confirm_password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="I agree to the terms and conditions"
              />
              {errors.acceptTerms && (
                <Typography color="error" variant="caption" display="block">
                  {errors.acceptTerms}
                </Typography>
              )}
            </Grid>
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export { Login, Register };