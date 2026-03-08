import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCartOpen } from '../store/cartSlice';
import { setNotificationOpen, setMessageOpen } from '../store/uiSlice';
import CartPage from '../pages/CartPage';
import NotificationPage from '../pages/NotificationPage';
import MeassagePage from '../pages/MeassagePage';
import './MainLayout.css';

export default function MainLayout() {
  const dispatch = useDispatch();
  const { open: cartOpen } = useSelector((s) => s.cart);
  const { notificationOpen, messageOpen } = useSelector((s) => s.ui);

  const hasOverlay = cartOpen || notificationOpen || messageOpen;

  return (
    <div className="main-layout">
      <Navbar />
      <main className="main-layout__content">
        <Outlet />
      </main>
      <Footer />

      {/* ── Overlay panels ── */}
      {hasOverlay && (
        <div
          className="overlay-backdrop"
          onClick={() => {
            dispatch(setCartOpen(false));
            dispatch(setNotificationOpen(false));
            dispatch(setMessageOpen(false));
          }}
        >
          <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
            {cartOpen && <CartPage />}
            {notificationOpen && <NotificationPage />}
            {messageOpen && <MeassagePage />}
          </div>
        </div>
      )}
    </div>
  );
}
