import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch leads from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:8000/api/alleads')
      .then((response) => response.json())
      .then((data) => setLeads(data));
  }, []);

  // Handle form submission for creating a new lead
  const handleSubmit = (e) => {
    e.preventDefault();
    const leadData = { name, email, phone };

    fetch('http://localhost:8000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLeads([...leads, data]); // Add new lead to the list
        setName(''); // Reset form fields
        setEmail('');
        setPhone('');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Column 1: Create Lead Form */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Create Lead</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                  placeholder="Enter lead's name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                  placeholder="Enter lead's email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  required
                  placeholder="Enter lead's phone number"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Create Lead</button>
            </form>
          </div>
        </div>

        {/* Column 2: Lead List */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Leads List</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr className="table-dark">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.phone}</td>
                      <td>
                        <Link to={`/followups/${lead.id}`} className="btn btn-info btn-sm">View Follow-ups</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadList;
