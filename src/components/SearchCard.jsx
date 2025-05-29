import React from 'react'

function SearchCard({searchedProducts}) {
  return (
    <div style={{border:"1px  solid  black " , 
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"left",
        width:"90vw",
        height:"30vh",
        boxShadow:"0px 0px 10px rgba(0, 0,0,0.1)",
        background:"#d8e9f0",
        borderRadius:"10px",
        marginTop:"3vh"
        }}>
          <div><img style={{height:"28vh", width:"25vw" , marginLeft:"3vh"}} src={searchedProducts.images} alt="" /></div>
          <div style={{display:"flex" , flexDirection:"column",justifyContent:"top", alignItems:"top", height:"30vh" , marginLeft:"2vw"}}>
            <h1 style={{marginBottom:"3vh"}}>{searchedProducts.title}</h1>
            <h3>{searchedProducts.description}</h3>
            <h2>price rs {searchedProducts.price}</h2>
          </div>
      
    </div>
  )
}

export default SearchCard
