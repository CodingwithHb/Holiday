import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employees from '../data/employees.json';
import managers from '../data/managers.json';
import '../styles/Login.css'; // Assure-toi de l'importer dans ton fichier JS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = employees.find(emp => emp.username === username && emp.password === password);
    const manager = managers.find(mgr => mgr.username === username && mgr.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/employee-dashboard');
    } else if (manager) {
      localStorage.setItem('user', JSON.stringify(manager));
      navigate('/manager-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          className="input-field"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
};

export default Login;
