import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'

function Navbar() {
  let[title , setTitle] = useState("");
  const navigate = useNavigate();
  const handleSearchCLick =()=>{
    if(title.length >0){
      navigate("/search")
    }
  }

  return (
    <div style={{background:"#d8e9f0"}}>
      <nav style={{display:"flex" , height:"10vh",}}>
       <img style={{marginLeft:"2vw" , marginRight:"8vw" }} src="https://static.vecteezy.com/system/resources/previews/027/395/710/original/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png" alt="" />
        <div><input onChange={(e)=>setTitle(e.target.value)}  type="text"  placeholder='search' style={{height:"4vh" , width:"30vw" ,  marginTop:"2vh"}}/>
        <button onClick={handleSearchCLick}  style={{height:"4.5vh" , width:"5vw" ,  marginTop:"2vh", background:"white" , border:"1px solid black" , marginRight:"8vw"}}>search</button></div>
        <ul style={{ display: "flex", height: "10vh", listStyle: "none" }}>
            <li style={{ marginLeft: "3vw" }}>
                <Link to="/home">Home</Link>
            </li>
            <li style={{ marginLeft: "5vw" }}>
                <Link to="/about">About</Link>
            </li>
            <li style={{ marginLeft: "5vw" }}>
                <Link to="/profile">Profile</Link>
            </li>
            <li style={{ marginLeft: "5vw" }}>
                <Link to="/">Register</Link>
            </li>
        </ul>

      </nav>
    </div>
  )
}

export default Navbar
