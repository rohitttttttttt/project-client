import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="register-page">
      <div className="register-page__logo" onClick={() => navigate('/')}>
        <span className="register-page__logo-orbit">Orbit</span>
        <span className="register-page__logo-farms">Farms</span>
      </div>

      <div className="register-page__card">
        <div className="register-page__tabs">
          <button
            className={`register-page__tab ${isLogin ? 'register-page__tab--active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`register-page__tab ${!isLogin ? 'register-page__tab--active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? <Login embedded /> : <SignUp embedded />}
      </div>
    </div>
  );
}

export default Register;
