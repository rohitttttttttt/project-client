import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { userContext } from '../context/userContext';

/**
 * useAuth — handles login / signup with loading + error states.
 * Uses authService under the hood.
 */
export default function useAuth() {
  const { login: ctxLogin, logout: ctxLogout } = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signup = async ({ fullName, email, phone, password, role }) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await authService.signup({ fullName, email, phone, password, role });
      ctxLogin(data.user, data.accessToken);
      navigate('/');
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, phone, password }) => {
    setLoading(true);
    setError('');
    try {
      const payload = password ? { password } : {};
      if (email) payload.email = email;
      if (phone) payload.phone = phone;
      const { data } = await authService.login(payload);
      ctxLogin(data.user, data.accessToken);
      navigate('/');
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Logout even if server call fails
    } finally {
      ctxLogout();
      navigate('/login');
    }
  };

  return { signup, login, logout, loading, error, setError };
}
