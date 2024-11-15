// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optional for additional styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route and other components
import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import LeadsList from './components/LeadsList';
import CreateLead from './components/CreateLead';
import FollowUpList from './components/FollowUpList';
import ScheduleFollowUp from './components/ScheduleFollowUp';
import UpdateFollowUpStatus from './components/UpdateFollowUpStatus';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AuthRedirect from './components/AuthRedirect'; // Import the new AuthRedirect component

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <Header />
          <div className="container-fluid">
            <Routes>
              {/* Unauthenticated Routes with redirection */}
              <Route
                path="/signup"
                element={
                  <AuthRedirect>
                    <Signup />
                  </AuthRedirect>
                }
              />
              <Route
                path="/"
                element={
                  <AuthRedirect>
                    <Login />
                  </AuthRedirect>
                }
              />

              {/* Protected Routes for authenticated users */}
              <Route path="/leads" element={<PrivateRoute element={<LeadsList />} />} />
              <Route path="/create-lead" element={<PrivateRoute element={<CreateLead />} />} />
              <Route path="/followups/:leadId" element={<PrivateRoute element={<FollowUpList />} />} />
              <Route path="/schedule-followup/:leadId" element={<PrivateRoute element={<ScheduleFollowUp />} />} />
              <Route path="/update-followup-status/:followUpId" element={<PrivateRoute element={<UpdateFollowUpStatus />} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
