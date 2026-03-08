import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotificationOpen, clearNotifications } from '../store/uiSlice';
import { X, Bell, Trash2 } from 'lucide-react';
import './NotificationPage.css';

function NotificationPage() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((s) => s.ui);

  return (
    <div className="notif-panel">
      <div className="notif-panel__header">
        <div className="notif-panel__header-left">
          <Bell size={20} />
          <h2 className="notif-panel__title">Notifications</h2>
          {notifications.length > 0 && (
            <span className="notif-panel__count">{notifications.length}</span>
          )}
        </div>
        <div className="notif-panel__header-right">
          {notifications.length > 0 && (
            <button className="notif-panel__clear" onClick={() => dispatch(clearNotifications())}>
              <Trash2 size={16} /> Clear
            </button>
          )}
          <button className="notif-panel__close" onClick={() => dispatch(setNotificationOpen(false))}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="notif-panel__body">
        {notifications.length > 0 ? (
          notifications.map((item, index) => (
            <div className="notif-panel__item" key={index}>
              <div className="notif-panel__item-icon">🔔</div>
              <div className="notif-panel__item-content">
                <p className="notif-panel__item-text">
                  <strong>{item.customer || 'Customer'}</strong> placed an order for{' '}
                  <strong>{item.product || 'a product'}</strong>
                </p>
                <p className="notif-panel__item-meta">
                  Qty: {item.quantity || 1} • ₹{item.price || 0}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="notif-panel__empty">
            <div className="notif-panel__empty-icon">🔕</div>
            <p className="notif-panel__empty-title">No notifications yet</p>
            <p className="notif-panel__empty-text">
              When someone places an order, you'll see it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
