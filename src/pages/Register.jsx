import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div style={{background:"#29252c",
        display:"flex",
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"top",
        height:"100vh"}}>

            <div style={{border:"1px  solid  black " , 
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    width:"50vw",
                    height:"80vh",
                    boxShadow:"0px 0px 10px rgba(0, 0,0,0.1)",
                    overflow:"hidden",
                    padding:"20px",
                    background:"#d8e9f0",
                    borderRadius:"10px",
                    marginTop:"1vh"
                    }}>
            <h1> If you are a new user please Regsiter here </h1>
            <button style={{}}><Link to="/signUp">Sign-UP</Link></button>
            <h1> if you are existing User Plase Login here</h1>
            <button><Link to="/login">login</Link></button>
            </div>
            
    </div>
  )
}

export default Register
