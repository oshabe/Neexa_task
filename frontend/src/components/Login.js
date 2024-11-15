import React, { useState, useContext } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './AuthContext';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      loginUser(response.data.user, response.data.access_token); // Update context
      navigate('/leads');
    } catch (error) {
      setErrorMessages(error.response?.data?.message || 'Error logging in.');
    }
  };

  return (
    <div style={{ background: '#f1f1f1',}}>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '600px' }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center mb-4">
              <div className="col-4">
                <label htmlFor="email" className="form-label fw-bold fs-5">Email address</label>
              </div>
              <div className="col-8">
                <input type="email" className="form-control form-control-lg" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required  placeholder="Enter your email"/>
              </div>
            </div>
            <div className="row align-items-center mb-4">
              <div className="col-4">
                <label htmlFor="Password" className="form-label fw-bold fs-5">Password</label>
              </div>
              <div className="col-8">
                <input type="password" className="form-control form-control-lg"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 fs-6 fw-bold">Login</button>
          </form>
          {errorMessages && <div className="alert alert-danger mt-3">{errorMessages}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
