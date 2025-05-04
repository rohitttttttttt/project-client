import React,{useContext} from 'react'
import { userContext } from '../context/userContext'

function UserInfoCard() {
    const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{display:"flex" , flexDirection:"row" , width:"96vw" , color:"whitesmoke" , marginLeft:"2vw"}}>
     <div  style={{marginLeft:"0vw", marginTop:"1vh", display:"flex"  , flexDirection:"column", alignItems:"center"}}>
        <img  style={{borderRadius:"100%", height:"30vh", width:"30vh"}} src="https://th.bing.com/th/id/OIP.b4I7OSQXr2NoQFlShVth_QHaE8?rs=1&pid=ImgDetMain" alt="" />
        <h2 style={{}}>{user.userName}</h2>
     </div>
     <div style={{marginLeft:"5vw", marginTop:"1vh"}}>
        <h1>{user.fullName || "full Name "} </h1>
        <h2>{user.email}</h2>
        <h2>{user.phone}</h2>
        <h2>{user.state},{user.city},{user.pincode} </h2>
        <button style={{ backgroundColor:"#f33535" ,  color:"whitesmoke", borderRadius:"5px",  height:"3.5vh" , width:"6vw", border:"0px" , fontSize:"3vh"}}>edit </button>
     </div>
    </div>
  )
}

export default UserInfoCard
