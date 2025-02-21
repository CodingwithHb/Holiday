import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import requests from '../data/requests.json';
import managers from '../data/managers.json';
import '../styles/ManagerDashboard.css';

const ManagerDashboard = () => {
  const [managerRequests, setManagerRequests] = useState([]);
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const manager = managers.find(mgr => mgr.id === user.id);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const managerRequests = storedRequests.filter(req => manager.employees.includes(req.employeeId));
    setManagerRequests(managerRequests);
  }, [manager]);

  const handleApprove = (index) => {
    const updatedRequests = [...managerRequests];
    updatedRequests[index].status = 'Approved';
    setManagerRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
  };

  const handleReject = (index) => {
    const updatedRequests = [...managerRequests];
    updatedRequests[index].status = 'Rejected';
    setManagerRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
  };

  const handleReschedule = (index) => {
    setSelectedRequestIndex(index);
    setNewStartDate(new Date(managerRequests[index].startDate));
    setNewEndDate(new Date(managerRequests[index].endDate));
  };

  const handleSaveReschedule = () => {
    const updatedRequests = [...managerRequests];
    updatedRequests[selectedRequestIndex].startDate = newStartDate.toISOString().split('T')[0];
    updatedRequests[selectedRequestIndex].endDate = newEndDate.toISOString().split('T')[0];
    updatedRequests[selectedRequestIndex].status = 'Rescheduled';
    setManagerRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
    setSelectedRequestIndex(null);
  };

  const handleDeleteRequest = (index) => {
    const updatedRequests = [...managerRequests];
    const deletedRequest = updatedRequests.splice(index, 1)[0];
    setManagerRequests(updatedRequests);
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const filteredRequests = storedRequests.filter(req => req.id !== deletedRequest.id);
    localStorage.setItem('requests', JSON.stringify(filteredRequests));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h2>Manager Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      
      <section className="requests-section">
        <h3>Requests</h3>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {managerRequests.map((req, index) => (
              <tr key={index}>
                <td>{req.employeeName}</td>
                <td>{req.startDate}</td>
                <td>{req.endDate}</td>
                <td>{req.status}</td>
                <td className="actions">
                  <button onClick={() => handleApprove(index)} className="approve-button">Approve</button>
                  <button onClick={() => handleReject(index)} className="reject-button">Reject</button>
                  <button onClick={() => handleReschedule(index)} className="reschedule-button">Reschedule</button>
                  <button onClick={() => handleDeleteRequest(index)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedRequestIndex !== null && (
        <section className="reschedule-section">
          <h3>Reschedule Request</h3>
          <div className="date-picker-container">
            <DatePicker
              selected={newStartDate}
              onChange={date => setNewStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="date-picker"
            />
            <DatePicker
              selected={newEndDate}
              onChange={date => setNewEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="date-picker"
            />
          </div>
          <button onClick={handleSaveReschedule} className="save-button">Save</button>
        </section>
      )}
    </div>
  );
};

export default ManagerDashboard;
