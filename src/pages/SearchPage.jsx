import React, { useState } from 'react'
import SearchCard from '../components/SearchCard'
import axios from 'axios'
function SearchPage() {
    let [title , setTitle] =useState()
    
  return (
    <div style={{background:"#29252c",
        display:"flex",
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"top",
        height:"100vh"}}>
      <SearchCard/>
    </div>
  )
}

export default SearchPage
