import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../context/userContext'

function SearchCard({searchedProducts}) {
  const navigate = useNavigate()
  const { setViewProduct, addCartItem, cartItem } = useContext(userContext)
  const productNavigate = () => {
    setViewProduct(searchedProducts)
    navigate("/productPage")
  }
  return (
    <div style={{ 
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"left",
        width:"90vw",
        height:"45vh",
        padding:"10px",
        background:"var(--color-bg)",
        marginTop:"0.5vh"
        }}
        onClick={productNavigate}
        >
          <div><img style={{height:"40vh", width:"34vw" , marginLeft:"3vh"}} src={searchedProducts.images} alt="" /></div>
          <div style={{display:"flex" , flexDirection:"column",justifyContent:"top", alignItems:"top", height:"30vh" , marginLeft:"2vw"}}>
            <h2 style={{marginBottom:"3vh"}}>{searchedProducts.title}</h2>
            <h4>{searchedProducts.description}</h4>
            <h3>price rs {searchedProducts.price}</h3>
          </div>
      
    </div>
  )
}

export default SearchCard
