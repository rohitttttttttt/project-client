import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import authService from '../services/authService';
import './SignUp.css';

function SignUp({ embedded = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await authService.signup({ fullName, email, phone, password, role });
      dispatch(loginSuccess({ user: data.user, accessToken: data.accessToken }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form className="signup-form" onSubmit={handleSubmit}>
      {!embedded && <h1 className="signup-form__title">Create Account</h1>}
      {!embedded && <p className="signup-form__desc">Fill in your details to get started</p>}

      {error && <div className="signup-form__error">{error}</div>}

      <div className="signup-form__group">
        <label className="signup-form__label">Full Name</label>
        <input type="text" className="signup-form__input" placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>

      <div className="signup-form__row">
        <div className="signup-form__group">
          <label className="signup-form__label">Email</label>
          <input type="email" className="signup-form__input" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="signup-form__group">
          <label className="signup-form__label">Phone</label>
          <input type="tel" className="signup-form__input" placeholder="10-digit mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <p className="signup-form__hint">At least one of email or phone is required</p>

      <div className="signup-form__group">
        <label className="signup-form__label">Password</label>
        <input type="password" className="signup-form__input" placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      </div>

      <div className="signup-form__group">
        <label className="signup-form__label">I am a</label>
        <select className="signup-form__input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Buyer</option>
          <option value="farmer">Farmer / Seller</option>
        </select>
      </div>

      <button type="submit" className="signup-form__submit" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      {!embedded && (
        <p className="signup-form__switch">
          Already have an account?{' '}<a onClick={() => navigate('/login')}>Login</a>
        </p>
      )}
    </form>
  );

  if (embedded) return formContent;

  return (
    <div className="signup-page">
      <div className="signup-page__left">
        <img className="signup-page__illustration" src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&q=80" alt="Farm landscape" />
        <h2 className="signup-page__tagline">Join the <span>Orbit Farms</span> community</h2>
        <p className="signup-page__subtitle">Start buying fresh produce directly from local farmers today.</p>
      </div>
      <div className="signup-page__right">{formContent}</div>
    </div>
  );
}

export default SignUp;
