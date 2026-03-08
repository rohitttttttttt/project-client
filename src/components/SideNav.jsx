import React, { useContext } from 'react';
import { Home, ShoppingCart, User, Mail, ContactRound, Bell, Store , LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { userContext } from '../context/userContext';

function SideNav() {
    const { searchInput, handleCartClick , handleNotificationClick , isLoggedIn} = useContext(userContext) 
    const navigate = useNavigate()
  return (
    <div className='card1' style={{
      width: "260px",
      display: "flex",
      alignItems: "start",
      justifyContent: "start",
      paddingTop: "10.2vh",
      flexDirection: "column",
      height: "100vh",
      flexShrink: 0,
      position:"sticky",
      top: "0",
      left: "0",
      
    }}>
      <div style={{
        width: "260px",
        height: "100%",
        backgroundColor: "var(--color-bg)",
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        paddingTop: "1rem",
        flexShrink:0,
        //boxShadow: "2px 0 8px rgba(0,0,0,0.4)",
        borderRight:"0.1px solid grey"
      }}>
        <ul style={{ width: "100%" , marginLeft: "0.8rem" }}>
          <li onClick={() => navigate('/')}><Home size={20} /> <span style={{ marginLeft: "0.8rem" }}>Home</span></li>
          <li onClick={()=>handleCartClick(true)}><ShoppingCart size={20} /> <span style={{ marginLeft: "0.8rem" }}>Cart</span></li>
          <li onClick={() => isLoggedIn ?navigate('/profile') : navigate('/register') }><User size={20} /> <span style={{ marginLeft: "0.8rem" }}>Profile</span></li>
          <li onClick={() =>isLoggedIn ?navigate('/message') : navigate('/register') }><Mail size={20} /> <span style={{ marginLeft: "0.8rem"   }}>Messages</span></li>
          <li ><ContactRound size={20} /> <span style={{ marginLeft: "0.8rem" }}>About Us</span></li>
          <li onClick={() =>isLoggedIn ? handleNotificationClick(true) : navigate('/register')  }><Bell size={20} /> <span style={{ marginLeft: "0.8rem" }}>Notifications</span></li>
          <li><Store size={20} /> <span style={{ marginLeft: "0.8rem" }}>Orders</span></li>
          <li onClick={() => navigate('/register')}><LogIn  size={20} /> <span style={{ marginLeft: "0.8rem" }}>Register</span></li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
