import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestForm from './RequestForm';
import '../styles/EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [userRequests, setUserRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
      const userRequests = storedRequests.filter(req => req.employeeId === user.id);
      setUserRequests(userRequests);
    }
  }, [user]);

  const handleRequestSubmit = (request) => {
    if (user) {
      const newRequest = { ...request, employeeId: user.id, employeeName: user.name, status: 'Pending' };
      const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
      const updatedRequests = [...storedRequests, newRequest];
      setUserRequests(updatedRequests.filter(req => req.employeeId === user.id));
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
    }
  };

  const handleDeleteRequest = (index) => {
    const updatedRequests = [...userRequests];
    const deletedRequest = updatedRequests.splice(index, 1)[0];
    setUserRequests(updatedRequests);
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const filteredRequests = storedRequests.filter(req => req.id !== deletedRequest.id);
    localStorage.setItem('requests', JSON.stringify(filteredRequests));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="container">
      <h2 className="dashboard-header">Employee Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <RequestForm onSubmit={handleRequestSubmit} className="request-form" />
      
      <div className="card">
        <h3>Your Requests</h3>
        <table className="request-table">
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
            {userRequests.map((req, index) => (
              <tr key={index}>
                <td>{req.employeeName}</td>
                <td>{req.startDate}</td>
                <td>{req.endDate}</td>
                <td>{req.status}</td>
                <td>
                  <button className="icon-btn" onClick={() => handleDeleteRequest(index)}>
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
