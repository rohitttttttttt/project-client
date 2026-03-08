import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import authService from '../services/authService';
import './Login.css';

function Login({ embedded = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const isEmail = identifier.includes('@');
    const payload = isEmail
      ? { email: identifier, password }
      : { phone: identifier, password };

    try {
      const { data } = await authService.login(payload);
      dispatch(loginSuccess({ user: data.user, accessToken: data.accessToken }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form className="login-form" onSubmit={handleSubmit}>
      {!embedded && <h1 className="login-form__title">Login</h1>}
      {!embedded && <p className="login-form__desc">Enter your credentials to access your account</p>}

      {error && <div className="login-form__error">{error}</div>}

      <div className="login-form__group">
        <label className="login-form__label">Email or Phone</label>
        <input
          type="text"
          className="login-form__input"
          placeholder="your@email.com or 9876543210"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
      </div>

      <div className="login-form__group">
        <label className="login-form__label">Password</label>
        <input
          type="password"
          className="login-form__input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-form__submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {!embedded && (
        <p className="login-form__switch">
          Don't have an account?{' '}<a onClick={() => navigate('/signup')}>Sign up</a>
        </p>
      )}
    </form>
  );

  if (embedded) return formContent;

  return (
    <div className="login-page">
      <div className="login-page__left">
        <img className="login-page__illustration" src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80" alt="Fresh farm produce" />
        <h2 className="login-page__tagline">Welcome back to <span>Orbit Farms</span></h2>
        <p className="login-page__subtitle">Fresh produce from local farmers, delivered to you.</p>
      </div>
      <div className="login-page__right">{formContent}</div>
    </div>
  );
}

export default Login;
