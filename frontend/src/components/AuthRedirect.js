// src/components/AuthRedirect.js
import{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/leads'); // Redirect to the leads page if the user is already logged in
    }
  }, [navigate]);

  return children;
};

export default AuthRedirect;
