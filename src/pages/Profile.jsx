import React, { useContext } from 'react'
import { userContext } from '../context/userContext'
import UserInfoCard from '../components/UserInfoCard'

function Profile() {
    const {user}= useContext(userContext)
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
