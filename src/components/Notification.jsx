import React from 'react';

function Notification({notification}) {
  return (
    <div
      style={{
        backgroundColor: '#1e1e1e',
        width: '400px',
        minHeight: '160px',
        margin: '12px auto',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: '600' }}>📦 New Order Received</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr',
          rowGap: '10px',
          columnGap: '12px',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>Customer:</div>
        <div>{notification.customer}</div>

        <div style={{ fontWeight: 'bold' }}>Product:</div>
        <div>{notification.product}</div>

        <div style={{ fontWeight: 'bold' }}>Price:</div>
        <div>₹{notification.price}</div>

        <div style={{ fontWeight: 'bold' }}>Quantity:</div>
        <div>{notification.quantity}</div>

        <div style={{ fontWeight: 'bold' }}>Address:</div>
        <div>{notification.address}</div>
      </div>
    </div>
  );
}

export default Notification;
