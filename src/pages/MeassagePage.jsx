import React from 'react'

import MessageCard from '../components/MessageCard'

function MeassagePage() {
  return (
    <div style={{width:"500px" , display:"flex" , flexDirection:"column" , justifyContent:"top" , alignItems:"center" , border :"1px solid black" , position:'fixed' , right:0 , overflow:"auto" , height:"90%"}}>
        <div style={{display:"flex" , width:"90%",justifyContent:"space-between" ,borderBottom:"1px solid grey"}}> 
            <h1>Messages</h1>
            <h1>x</h1>
        </div>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
    </div>
  )
}

export default MeassagePage
