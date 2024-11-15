import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const FollowUpList = () => {
  const { leadId } = useParams(); // Extract leadId from the URL
  const [followUps, setFollowUps] = useState([]);
  const [editingFollowUpId, setEditingFollowUpId] = useState(null); // To track the follow-up being edited
  const [newStatus, setNewStatus] = useState(''); // To hold the new status value

  useEffect(() => {
    // Fetch follow-ups for the specific lead
    fetch(`http://localhost:8000/api/followups/${leadId}`)
      .then((response) => response.json())
      .then((data) => {
        setFollowUps(data);
        // Check for missed follow-ups
        checkForMissedFollowUps(data);
      });
  }, [leadId]);

  const handleUpdateStatus = (followUpId) => {
    // Update status for the selected follow-up
    const updatedFollowUp = { status: newStatus };

    fetch(`http://localhost:8000/api/followups/${followUpId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFollowUp),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Status updated:', data);
        setFollowUps((prevFollowUps) =>
          prevFollowUps.map((followUp) =>
            followUp.id === followUpId ? { ...followUp, status: newStatus } : followUp
          )
        );
        setEditingFollowUpId(null); // Close the edit form
      });
  };

  const checkForMissedFollowUps = (data) => {
    const currentDate = new Date();
    data.forEach((followUp) => {
      const scheduledDate = new Date(followUp.scheduled_at);
      if (scheduledDate < currentDate && followUp.status !== 'Completed') {
        // Display a toast notification for missed follow-ups
        toast.error(`Missed follow-up: Lead ${followUp.id} scheduled for ${followUp.scheduled_at}`);
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">Follow-ups for Lead {leadId}</h3>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Status</th>
              <th>Scheduled Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((followUp) => (
              <tr key={followUp.id}>
                <td>
                  {followUp.id === editingFollowUpId ? (
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="form-control"
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Missed">Missed</option>
                    </select>
                  ) : (
                    followUp.status
                  )}
                </td>
                <td>{followUp.scheduled_at}</td>
                <td>
                  {followUp.id === editingFollowUpId ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateStatus(followUp.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setEditingFollowUpId(followUp.id);
                        setNewStatus(followUp.status); // Pre-fill the status for editing
                      }}
                    >
                      Edit Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Button to schedule a new follow-up */}
        <div className="text-center mt-4">
          <Link to={`/schedule-followup/${leadId}`} className="btn btn-primary">
            Schedule New Follow-up
          </Link>
        </div>
      </div>

      {/* Toast Container to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default FollowUpList;
