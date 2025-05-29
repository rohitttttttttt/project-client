import React,{useEffect, useState , useRef} from 'react'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CartPage from './CartPage'
import { useContext } from 'react'
import { userContext } from '../context/userContext'
import {io} from 'socket.io-client'

const socket = io("http://localhost:3000")
function Home() {

  const {user , token} = useContext(userContext)
   useEffect(()=>{
    console.log(user._id)
    socket.emit("createConnection" , user._id)
   },[])
    let[Products , setProduct]= useState([])
    
    //let[flag , setFlag]=useState(1)
    let[page , setPage]=useState(1)
    const navigate = useNavigate()
    const fetchref = useRef({})
    const fetchInfinity = useRef({})
    const handleNewClick = ()=>{
        navigate("/uploadProduct")
    }
    const {handleCartClick , cartopen ,} = useContext(userContext)
    

    const handleScroll = async () => {
      const check =window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
      if(!check || fetchInfinity.current[page]){
        return
       }
       fetchInfinity.current[page] =true;
      
      
      setPage((prev) => prev + 1)

    }

    useEffect(()=>{
      window.addEventListener("scroll" , handleScroll)
      return ()=> window.removeEventListener("scroll" , handleScroll)
    },[page])

  
    useEffect(()=>{
      if(fetchref.current[page])return;

      fetchref.current[page]=true;
      const getProducts = async () => {
        console.log(token)
        console.log(localStorage.getItem("token"))
        const res = await axios.get(`http://localhost:3000/product/getProductsforHomePage/${page}` , {
          withCredentials:true ,
          headers:{
            Authorization:token
          }
        })
       

        if(res.status===200){
          const products = res.data
          setProduct((prev)=>[...prev , ...products.productToReturn])
          
        }
      }

      getProducts()
    }, [page])
  return (
    <>
     {cartopen && <CartPage/>}
      <div style={{background:"#29252c",
        display:"flex",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"center",
        
       }}>
      
      {Products && Products.map((item)=>(
        <ProductCard  key={item._id} Product={item}/>
      ))}
     <button onClick={handleNewClick} style={{ backgroundColor:"#f33535" ,  color:"whitesmoke", borderRadius:"5px",  height:"4.5vh" , width:"8vw", border:"0px" , fontSize:"4vh", position:"fixed" , zIndex:"1000" , bottom:"7vh" , right:"5vw"}}>New</button>
    </div>
    </>
  )
}
export {socket}
export default Home
