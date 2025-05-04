import React from 'react'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    const handleNewClick = ()=>{
       
        navigate("/uploadProduct")
    }
  return (
    <div style={{background:"#29252c",
        display:"flex",
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"top",
        height:"100vh"}}>
     
      <ProductCard/>

     <button onClick={handleNewClick} style={{ backgroundColor:"#f33535" ,  color:"whitesmoke", borderRadius:"5px",  height:"4.5vh" , width:"8vw", border:"0px" , fontSize:"4vh", position:"fixed" , zIndex:"1000" , bottom:"7vh" , right:"5vw"}}>New</button>
    </div>
  )
}

export default Home
