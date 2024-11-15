// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './AuthContext';

const Header = () => {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <header className="bg-white">
      <div className="container text-dark text-center py-3 d-flex flex-wrap justify-content-between align-items-center px-3">
        {/* Left Section: Logo and Search Bar */}
        <div className="d-flex align-items-center flex-grow-1">
          <Link to="/" className="d-flex align-items-center">
            <img
              src="/images/image.png"
              alt="Logo"
              className="img-fluid me-2"
              style={{ width: '50px', height: '40px',borderRadius:'50%' }}
            />
          </Link>

        </div>

        {/* Right Section: Log in/Create Account or User Info/Log Out */}
        <div className="d-flex align-items-center mt-3 mt-md-0">
          {isLoggedIn ? (
            <>
              <span className="me-3">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-sm btn-danger">
                Log Out
              </button>
            </>
          ) : (
            <>
              <nav className="me-3">
                <Link to="/" className="text-dark">Log in</Link>
              </nav>
              <Link to="/signup">
                <button type="button" className="btn btn-sm border-primary text-primary">
                  Create account
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
