import React from 'react'

function SearchCard() {
  return (
    <div style={{border:"1px  solid  black " , 
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"left",
        width:"90vw",
        height:"30vh",
        boxShadow:"0px 0px 10px rgba(0, 0,0,0.1)",
        overflow:"hidden",
        background:"#d8e9f0",
        borderRadius:"10px",
        marginTop:"3vh"
        }}>
          <div><img style={{height:"28vh", width:"25vw" , marginLeft:"3vh"}} src="https://i.pinimg.com/originals/a2/ab/c2/a2abc2ecb6c73161c13054f1c1c6fc6a.jpg" alt="" /></div>
          <div style={{display:"flex" , flexDirection:"column",justifyContent:"top", alignItems:"top", height:"30vh" , marginLeft:"2vw"}}>
            <h1 style={{marginBottom:"3vh"}}>title will go here </h1>
            <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat quos molestiae consequatur quod veritatis deserunt facere magni, dignissimos earum dolorem distinctio? Beatae vel saepe quis. Cumque, itaque? Saepe, eaque laboriosam?</h3>
            <h2>Price 100</h2>
          </div>
      
    </div>
  )
}

export default SearchCard
