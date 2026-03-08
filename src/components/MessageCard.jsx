import React from 'react'

function MessageCard({img , userName , onClick}) {
  return (
    <div style={{ display:"flex" , width:"480px" , margin:"0px"  }} onClick={onClick}>
      <div style={{width:"100px", display:"flex" , justifyContent:"center" , alignItems:"center"}}>
            <img style={{width:"70px" ,height:"70px", borderRadius:"50%"}} src={img?img:"https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?cb=iwc2&rs=1&pid=ImgDetMain"} alt="" />
      </div>
      <div style={{width:"400px"}}>
            <h3>{userName}</h3>
            <p style={{marginTop:"0px"}}>msg will show here like this</p> 
      </div>
    </div>
  )
}

export default MessageCard
