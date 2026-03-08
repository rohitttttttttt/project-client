import React ,{useContext}from 'react'
import { userContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

function OwnProduct({ Product }) {
     const { setViewProduct } = useContext(userContext)
    const navigate = useNavigate()

  const productNavigate = () => {
    setViewProduct(Product)
    navigate("/profileProductPage")
  }
  return (
    <div style={{
      backgroundColor: "var(--color-bg)",
      height: "40vh",
      width: "20vw",
      borderRadius: "12px",
      marginTop: "1vh",
      marginLeft: "1vw",
      marginRight: "1vw",
      padding: "1vh 0.5vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backdropFilter: "blur(5px)",
      
    }} 
    onClick={productNavigate}
    >
      <div style={{ textAlign: "left" }}>
        <img 
          src={Product.images} 
          alt="Product" 
          style={{
            height: "35vh",
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "0.2vh"
          }} 
        />
        <h3 style={{
          fontSize: "1.2rem",
          color: "#fff",
          margin: "0.5vh 0",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>{Product.title}</h3>
      </div>

     
    </div>
  )
}

export default OwnProduct
