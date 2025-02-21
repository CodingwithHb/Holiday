import React, { useState } from 'react';

const RequestForm = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    onSubmit({ startDate, endDate });
  };

  return (
    <div>
      <h3>Request Leave</h3>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RequestForm;
