import React from 'react'

import UserInfoCard from '../components/UserInfoCard'

function Profile() {
    
  return (
    <div style={{background:"#29252c",
        display:"flex",
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"top",
        height:"100vh"}}>
        <UserInfoCard/>
    </div>
  )
}

export default Profile
