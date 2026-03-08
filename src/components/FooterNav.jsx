import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusSquare, FaUser } from "react-icons/fa";

export default function FooterNav() {
  const navStyles = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "50px",
    background: "rgba(26, 26, 26, 0.95)", // smooth dark base
    borderTop: "1px solid rgba(227,197,101,0.2)", // subtle gold line
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(8px)",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)",
  };

  const linkStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(244,242,237,0.6)",
    textDecoration: "none",
    fontSize: "12px",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
  };

  const activeLinkStyle = {
    color: "#E3C565", // ZenVilla gold accent
    transform: "translateY(-4px)",
    textShadow: "0 0 10px rgba(227,197,101,0.5)",
  };

  const iconSize = 24;

  return (
    <nav style={navStyles}>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { ...linkStyles, ...activeLinkStyle } : linkStyles
        }
      >
        <FaHome size={iconSize} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/create"
        style={({ isActive }) =>
          isActive ? { ...linkStyles, ...activeLinkStyle } : linkStyles
        }
      >
        <FaPlusSquare size={iconSize} />
        <span>Create</span>
      </NavLink>

      <NavLink
        to="/profile"
        style={({ isActive }) =>
          isActive ? { ...linkStyles, ...activeLinkStyle } : linkStyles
        }
      >
        <FaUser size={iconSize} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
