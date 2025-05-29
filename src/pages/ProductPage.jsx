import React from 'react'
import { userContext } from '../context/userContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function ProductPage() {
  const {  product , token ,  addChatUser} = useContext(userContext)
  const navigate = useNavigate();
  const getTheUserName = async ()=>{
    console.log(product.owner)
    const userName = await axios.get(`http://localhost:3000/user/getUser`,
       {
        withCredentials: true,
        params: { id: product.owner },
        headers:{
            Authorization:token
          }

    })
    addChatUser(userName.data.user)
    navigate("/chat")
  }
  return (
    <div style={{backgroundColor:"#29252c" ,display:"flex" ,flexDirection:"column" , alignItems:"center"}}>
    <div style={{backgroundColor:"#d8e9f0" ,marginTop:"13px", display:"flex" ,flexDirection:"column" , alignItems:"center" , width:"60vw"}}>
      <img style={{marginTop:"8px" , height:"40vh" ,width: "50%" }} src={product.images} alt="" />
      <div style={{display:"flex" , justifyContent:"space-between" ,width: "50%" }}>
      <h2 style={{ margin:"0"}}>{product.title}</h2>
      <h2 style={{ margin:"0", color:"#f33535"}}>Rs-{product.price}</h2>
      </div>
      <div style={{width:"50%"}}>
        <h2>Type:{product.type}</h2>
        <h2>available:{product.quantity}</h2>
      </div>
      <div style={{display:"flex" , justifyContent:"space-between" ,width: "50%" }}>
        <button style={{ backgroundColor:"#f33535" ,  color:"whitesmoke",  height:"4.5vh" , width:"10vw", border:"0px" , fontSize:"4vh", }}>Buy now</button>
        <button style={{ backgroundColor:"#f33535" ,  color:"whitesmoke", borderRadius:"5px",  height:"4.5vh" , width:"10vw", border:"0px" , fontSize:"4vh", }}>Add to cart</button>
    </div>
    <div style={{display:"flex" , justifyContent:"space-between" ,width: "50%" }}>
        <button style={{ backgroundColor:"#f33535" ,  color:"whitesmoke",  height:"4.5vh" , border:"0px" , fontSize:"4vh", marginTop:"10px" }} onClick={getTheUserName} >Chat with farmer</button>
        
    </div>

      <h3 style={{width:"50%"}}>{product.description}</h3>
      <h3>Location:{product.location}</h3>
     
    </div>
    
    
    </div>
  )
}

export default ProductPage
