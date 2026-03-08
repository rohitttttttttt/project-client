import React, { useContext } from 'react';
import { userContext } from '../context/userContext';

function UserInfoCard() {
  const { user } = useContext(userContext);

  return (
    <div 
      className="card1"
      style={{
        width:"100%",
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        gap: "3.5rem",

        
      }}
    >
      <div style={{ textAlign: "center", flexShrink: 0 ,  gap: "3.5rem",}}>
        <img
          src="https://th.bing.com/th/id/OIP.b4I7OSQXr2NoQFlShVth_QHaE8?rs=1&pid=ImgDetMain"
          alt="Profile"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid var(--color-accent)",
          }}
        />
        <h2 style={{ marginTop: "1rem", fontSize: "1.4rem" }}>{user.userName}</h2>
      </div>

      <div style={{ flex: 1 ,  gap: "3.5rem",}}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "1.3rem" }}>{user.fullName || "Full Name"}</h1>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.state}, {user.city}, {user.pincode}</p>

        <button style={{ marginTop: "2rem" }}>Edit Profile</button>
      </div>
    </div>
  );
}

export default UserInfoCard;
