import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../context/userContext'


function ProductCard({Product}) {
  const { setViewProduct, addCartItem , cartItem } = useContext(userContext)
  const navigate = useNavigate()
  const productNavigate = ()=>{
    setViewProduct(Product)

    navigate("/productPage")
  }
  const handleAddCartItem = ()=>{
      addCartItem(Product)
      console.log(cartItem)
  }
  return (
    <div style={{backgroundColor:"#d8e9f0", height:"60vh", width:"20vw", borderRadius:"10px", boxShadow:"initial" , marginTop:"3vh", marginLeft:"4vw" , marginRight:"4vw"}}>
     <div style={{display:"flex" , alignItems:"center", justifyContent:"top" , flexDirection:"column"}}>
        <img  style={{height:"40vh" , width:"18vw" , marginTop:"2vh"}} src={Product.images} alt="hh" />
     </div>
     <br />
     <h1 style={{marginLeft:"1vw", marginTop:"0px"}}>{Product.title}</h1>
     <div>
        <button style={{marginLeft:"1vw", backgroundColor:"#f33535" ,  color:"whitesmoke", borderRadius:"5px",  height:"3vh" , width:"7vw", border:"0px" , fontSize:"2vh"}} onClick={productNavigate}>view product</button>
        <button style={{marginLeft:"7vw" , backgroundColor:"#f33535", color:"whitesmoke" ,borderRadius:"5px", height:"3vh" , width:"4vw", border:"0px" , fontSize:"2vh" }} onClick={handleAddCartItem}>cart </button>
        
     </div>
    </div>
  )
}

export default ProductCard