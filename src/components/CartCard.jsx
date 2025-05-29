import React from 'react'
import { useContext } from 'react'
import { userContext } from '../context/userContext'


function CartCard({cartItem}) {

  return (
    <div style={{backgroundColor:"#d8e9f0" , width:"400px" , height:"170px" , margin:"12px" , borderRadius:"10%"  , padding:"1px" , display:"flex"}} >
    <div style={{ width:"100px" , height:"100px"  , margin:"20px" , borderRadius:"30%" , backgroundColor:"whitesmoke" , padding:"1px" ,   display: "flex",alignItems: "center",justifyContent: "center"}}>
            <img  style={{width:"70px" , height:"70px" , borderRadius:"10%"}} src="https://wallpaperaccess.com/full/2774044.jpg" alt=""  />
    </div>
    <div >
       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "25px" , width:"240px" }}>
            <div style={{ backgroundColor: "#f33535", display: "inline-block", borderRadius: "15%", padding: "8px", color: "white" }}>
               {cartItem.type}
            </div>
            <div style={{ marginRight: "10px", cursor: "pointer", fontWeight: "bold" }}>
                X
            </div>
        </div>
        <div>
            <h3 style={{ margin: "8px 0 8px 0" }}>{cartItem.title}</h3>
            <h2 style={{ margin: "8px 0 8px 0" }}>RS{cartItem.price}</h2>
           <select defaultValue="0">
              {[...Array(cartItem.quantity)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                    {index + 1}
                </option>
               ))}
            </select>
        </div>

    </div>
    </div>
  )
}

export default CartCard
