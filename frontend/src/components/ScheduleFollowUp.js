import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FollowUpList = () => {
  const { leadId } = useParams(); // Extract leadId from the URL
  const [followUps, setFollowUps] = useState([]);
  const [scheduledAt, setScheduledAt] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    // Fetch follow-ups for the specific lead
    fetch(`http://localhost:8000/api/followups/${leadId}`)
      .then(response => response.json())
      .then(data => setFollowUps(data));
  }, [leadId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const followUpData = { lead_id: leadId, scheduled_at: scheduledAt, status };

    fetch('http://localhost:8000/api/followups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(followUpData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFollowUps([...followUps, data]); // Add new follow-up to list
        setScheduledAt(''); // Clear form
        setStatus('Pending');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Column 1: Schedule Follow-Up Form */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4 mb-4">
            <h3 className="text-center mb-4">Schedule Follow-Up for Lead {leadId}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Scheduled At:</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Missed">Missed</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Schedule Follow-Up</button>
            </form>
          </div>
        </div>

        {/* Column 2: Follow-Up List */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Follow-ups for Lead {leadId}</h3>
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Status</th>
                  <th>Scheduled Date</th>
                </tr>
              </thead>
              <tbody>
                {followUps.map((followUp) => (
                  <tr key={followUp.id}>
                    <td>{followUp.status}</td>
                    <td>{followUp.scheduled_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUpList;
