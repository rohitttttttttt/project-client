import React, { useState, useEffect , useContext , useRef} from 'react'
import SearchCard from '../components/SearchCard'
import axios from 'axios'
import { userContext } from '../context/userContext'
function SearchPage() {
  const [searchedProduct , setSearchedProducts] = useState([])
    const {search}=useContext(userContext)
    const fetchref = useRef()
    
    useEffect(()=>{
      if(fetchref.current)return
      fetchref.current=true
     const getSearch =async () => {
        const searchItems  = await axios.get("http://localhost:3000/product/advanceSearch" ,{
        params:{
          title :search
        },
        withCredentials:true ,
        headers:{
          Authorization:localStorage.getItem("token")
          }
          
      })
      console.log(searchItems)
      
         console.log("setting searched products")
         
       
          setSearchedProducts((prev)=>[...prev , ...searchItems.data.productToSend])
         
   
    }
     getSearch()
       
    },[])

    
         console.log(searchedProduct)
    
  return (
    <div style={{background:"#29252c",
        display:"flex",
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"top",
        }}>
     {searchedProduct.map((value)=>(<SearchCard key={value._id} searchedProducts={value}/>))}
    </div>
  )
}

export default SearchPage
