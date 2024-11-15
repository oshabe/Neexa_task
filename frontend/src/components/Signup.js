import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'Sales Rep', // Default role selection
  });
  const [errorMessages, setErrorMessages] = useState(null);
  const navigate = useNavigate(); // Initialize navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signup', formData);
      console.log('User registered:', response.data);

      // Clear the form
      setFormData({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'Sales Rep',
      });

      // Redirect to sign-in page
      navigate('/'); // Adjust this route if needed
    } catch (error) {
      setErrorMessages(error.response.data.errors || 'Error signing up.');
      console.error('There was an error signing up!', error);
    }
  };

  return (
    <div style={{ background: '#f1f1f1' }}>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="row align-items-center mb-4">
            <div className="col-4">
              <label htmlFor="name" className="form-label fw-bold fs-5">Full Name</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                className="form-control form-control-lg"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          </div>
          {/* Email */}
          <div className="row align-items-center mb-4">
            <div className="col-4">
              <label htmlFor="email" className="form-label fw-bold fs-5">Email</label>
            </div>
            <div className="col-8">
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          {/* Password */}
          <div className="row align-items-center mb-4">
            <div className="col-4">
              <label htmlFor="password" className="form-label fw-bold fs-5">Password</label>
            </div>
            <div className="col-8">
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>
          {/* Confirm Password */}
          <div className="row align-items-center mb-4">
            <div className="col-4">
              <label htmlFor="password_confirmation" className="form-label fw-bold fs-5">Confirm Password</label>
            </div>
            <div className="col-8">
              <input
                type="password"
                className="form-control form-control-lg"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>
          {/* Role */}
          <div className="row align-items-center mb-4">
            <div className="col-4">
              <label htmlFor="role" className="form-label fw-bold fs-5">Role</label>
            </div>
            <div className="col-8">
              <select
                className="form-control form-control-lg"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Admin">Admin</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Sales Rep">Sales Rep</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 fs-6 fw-bold">Sign Up</button>
        </form>
        {errorMessages && <div className="alert alert-danger mt-3">{JSON.stringify(errorMessages)}</div>}
      </div>
    </div>
  </div>
  );
};

export default Signup;
