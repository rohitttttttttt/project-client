import React from 'react'

function ProductCard( ) {
  return (
    <div style={{backgroundColor:"#d8e9f0", height:"60vh", width:"20vw", borderRadius:"10px", boxShadow:"initial" , margin:"2vh" }}>
     <div style={{display:"flex" , alignItems:"center", justifyContent:"top" , flexDirection:"column"}}>
        <img  style={{height:"40vh" , width:"18vw" , marginTop:"2vh"}} src="https://wallpapers.com/images/hd/mango-pictures-jngjbg86yqf5owud.jpg" alt="hh" />
     </div>
     <br />
     <h1 style={{marginLeft:"1vw", marginTop:"0px"}}>title go here like this </h1>
     <div>
        <button style={{marginLeft:"1vw", backgroundColor:"#f33535" ,  color:"whitesmoke", borderRadius:"5px",  height:"3vh" , width:"7vw", border:"0px" , fontSize:"2vh"}}>view product</button>
        <button style={{marginLeft:"7vw" , backgroundColor:"#f33535", color:"whitesmoke" ,borderRadius:"5px", height:"3vh" , width:"4vw", border:"0px" , fontSize:"2vh" }}>cart </button>
     </div>
    </div>
  )
}

export default ProductCard