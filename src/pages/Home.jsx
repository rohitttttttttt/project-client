import React,{useEffect, useState , useRef} from 'react'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Home() {
    let[Products , setProduct]= useState([])
    //let[flag , setFlag]=useState(1)
    let[page , setPage]=useState(1)
    const navigate = useNavigate()
    const fetchref = useRef({})
    const fetchInfinity = useRef({})

    const handleNewClick = ()=>{
        navigate("/uploadProduct")
    }

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
      console.log("getting posts ")
      const getProducts = async () => {
        const res = await axios.get(`http://localhost:3000/product/getProductsforHomePage/${page}` , {
          withCredentials:true ,
          headers:{
            Authorization:localStorage.getItem("token")
          }
        })
       

        if(res.status===200){
          const products = res.data
          setProduct((prev)=>[...prev , ...products.productToReturn])
          console.log(Products)
        }
      }

      getProducts()
    }, [page])
  return (
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
  )
}

export default Home
