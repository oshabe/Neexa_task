// src/components/CreateLead.js
import React, { useState } from 'react';

const CreateLead = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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
        console.log('Lead created:', data);
      });
  };

  return (
    <div>
      <h2>Create Lead</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">Create Lead</button>
      </form>
    </div>
  );
};

export default CreateLead;
