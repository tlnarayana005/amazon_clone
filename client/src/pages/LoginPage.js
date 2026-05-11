import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { useStore } from '../context/Store';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useStore();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('amazonCloneToken', data.token);
      dispatch({ type: 'SET_USER', payload: data });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-panel">
      <h1>Sign In</h1>
      {error && <p className="status-note">{error}</p>}
      <form onSubmit={submitHandler}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>
        <button type="submit" className="primary-button">
          Login
        </button>
      </form>
      <p>
        New customer? <Link to="/register">Create an account</Link>
      </p>
      <p className="muted">Demo login: demo@amazon.test / password123</p>
    </div>
  );
}

export default LoginPage;
