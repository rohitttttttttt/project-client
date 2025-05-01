import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div style={{background:"#d8e9f0"}}>
      <nav style={{display:"flex" , height:"10vh",}}>
       <img style={{marginLeft:"2vw" , marginRight:"8vw" }} src="https://static.vecteezy.com/system/resources/previews/027/395/710/original/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png" alt="" />
        <input type="text"  placeholder='search' style={{height:"4vh" , width:"30vw" ,  marginTop:"2vh",  marginRight:"8vw"}}/>
        <ul style={{ display: "flex", height: "10vh", listStyle: "none" }}>
            <li style={{ marginLeft: "3vw" }}>
                <Link to="/">Home</Link>
            </li>
            <li style={{ marginLeft: "5vw" }}>
                <Link to="/about">About</Link>
            </li>
            <li style={{ marginLeft: "5vw" }}>
                <Link to="/profile">Profile</Link>
            </li>
            <li style={{ marginLeft: "5vw" }}>
                <Link to="/register">Register</Link>
            </li>
        </ul>

      </nav>
    </div>
  )
}

export default Navbar
