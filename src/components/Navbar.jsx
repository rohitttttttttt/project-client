import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCartOpen } from '../store/cartSlice';
import { setSearch, setNotificationOpen, setMessageOpen } from '../store/uiSlice';
import { Search, Package, ShoppingCart, Menu, X, MessageSquare, Bell, User } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((s) => s.auth);
  const { items: cartItems } = useSelector((s) => s.cart);
  const { notifications } = useSelector((s) => s.ui);

  const [title, setTitle] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearchClick = () => {
    if (title.trim().length > 0) {
      dispatch(setSearch(title.trim()));
      navigate(`/search?q=${encodeURIComponent(title.trim())}`);
      setMobileOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  const navTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const togglePanel = (action) => {
    dispatch(action);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => navTo('/')}>
          <span className="navbar__logo-orbit navbar__logo--full">Orbit</span>
          <span className="navbar__logo-farms navbar__logo--full">Farms</span>
          <span className="navbar__logo-orbit navbar__logo--short">O</span>
          <span className="navbar__logo-farms navbar__logo--short">F</span>
        </div>

        {/* Search */}
        <div className="navbar__search">
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search fresh products..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search
            size={20}
            className="navbar__search-icon"
            onClick={handleSearchClick}
          />
        </div>

        {/* Desktop Actions */}
        <div className="navbar__actions">
          <button className="navbar__action-btn" onClick={() => isLoggedIn ? navTo('/profile') : navTo('/register')}>
            <Package size={20} className="icon" />
            <span>Orders</span>
          </button>

          <button className="navbar__action-btn" onClick={() => isLoggedIn ? togglePanel(setMessageOpen(true)) : navTo('/register')}>
            <MessageSquare size={20} className="icon" />
            <span>Messages</span>
          </button>

          <button className="navbar__action-btn" onClick={() => isLoggedIn ? togglePanel(setNotificationOpen(true)) : navTo('/register')}>
            <Bell size={20} className="icon" />
            <span>Alerts</span>
            {notifications.length > 0 && (
              <span className="navbar__cart-badge">{notifications.length}</span>
            )}
          </button>

          <button
            className="navbar__action-btn"
            onClick={() => dispatch(setCartOpen(true))}
            style={{ position: 'relative' }}
          >
            <ShoppingCart size={20} className="icon" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="navbar__cart-badge">{cartItems.length}</span>
            )}
          </button>

          {isLoggedIn ? (
            <button className="navbar__login-btn" onClick={() => navTo('/profile')}>
              <User size={16} style={{ marginRight: 4 }} />
              Profile
            </button>
          ) : (
            <button className="navbar__login-btn" onClick={() => navTo('/login')}>
              Login
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <button className="navbar__action-btn" onClick={() => isLoggedIn ? navTo('/profile') : navTo('/register')}>
          <Package size={20} className="icon" /> Orders
        </button>
        <button className="navbar__action-btn" onClick={() => isLoggedIn ? togglePanel(setMessageOpen(true)) : navTo('/register')}>
          <MessageSquare size={20} className="icon" /> Messages
        </button>
        <button className="navbar__action-btn" onClick={() => isLoggedIn ? togglePanel(setNotificationOpen(true)) : navTo('/register')}>
          <Bell size={20} className="icon" /> Alerts
          {notifications.length > 0 && <span className="navbar__cart-badge">{notifications.length}</span>}
        </button>
        <button className="navbar__action-btn" onClick={() => { dispatch(setCartOpen(true)); setMobileOpen(false); }}>
          <ShoppingCart size={20} className="icon" /> Cart
          {cartItems.length > 0 && <span className="navbar__cart-badge">{cartItems.length}</span>}
        </button>
        {isLoggedIn ? (
          <button className="navbar__login-btn" onClick={() => navTo('/profile')}>Profile</button>
        ) : (
          <button className="navbar__login-btn" onClick={() => navTo('/login')}>Login</button>
        )}
      </div>
    </>
  );
}

export default Navbar;
