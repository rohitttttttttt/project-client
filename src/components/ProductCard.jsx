import React from 'react'

function ProductCard({Product}) {
  return (
    <div style={{backgroundColor:"#d8e9f0", height:"60vh", width:"20vw", borderRadius:"10px", boxShadow:"initial" , marginTop:"3vh", marginLeft:"4vw" , marginRight:"4vw"}}>
     <div style={{display:"flex" , alignItems:"center", justifyContent:"top" , flexDirection:"column"}}>
        <img  style={{height:"40vh" , width:"18vw" , marginTop:"2vh"}} src={Product.images} alt="hh" />
     </div>
     <br />
     <h1 style={{marginLeft:"1vw", marginTop:"0px"}}>{Product.title}</h1>
     <div>
        <button style={{marginLeft:"1vw", backgroundColor:"#f33535" ,  color:"whitesmoke", borderRadius:"5px",  height:"3vh" , width:"7vw", border:"0px" , fontSize:"2vh"}}>view product</button>
        <button style={{marginLeft:"7vw" , backgroundColor:"#f33535", color:"whitesmoke" ,borderRadius:"5px", height:"3vh" , width:"4vw", border:"0px" , fontSize:"2vh" }}>cart </button>
     </div>
    </div>
  )
}

export default ProductCard