import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'


function Register() {
  let [flag , setFlag]= useState(true)
  let [msg , setMsg] = useState("new user signUP")
  const handleClick =(e)=>{
    e.preventDefault()
    if(msg.startsWith('n')){
      setMsg("existing user login")
    }else{
      setMsg("new user signUP")
    }
    setFlag(!flag)
  }
  return (
    <div style={{background:"#29252c",
        display:"flex",
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"top",
        height:"100vh",
        color:"black"
        }}>
      <h3 style={{background:"#d8e9f0" , width:"10vw" , textAlign:"center" , height:"4vh" }} onClick={handleClick}>{msg}</h3>
        {flag && <Login/>
         }
        {!flag && <SignUp/>
         }
   
    </div>
  )
}

export default Register
