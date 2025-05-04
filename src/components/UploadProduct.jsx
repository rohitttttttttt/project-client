import React,{useState}from 'react'
import axios from 'axios'

function UploadProduct() {
  let [title , setTitle]= useState("")
  let[description, setDescription ]= useState("")
  let[type , setType]= useState("")
  let[subType , setSubType ]= useState("")
  let[quantity, setQuantity ]= useState()
  let[quantityType, setQuantityType]= useState()
  let[price , setPrice ]= useState("")
  let[location , setLocation ]= useState("")
  let[image , setImage]= useState();
  let[preview , setPreview] =useState();

  const handleImage=(e)=>{
    const selected = e.target.files[0]
    setImage(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("title" , title)
    data.append("description" , description)
    data.append("type" , type)
    data.append("subType", subType)
    data.append("quantity" , quantity)
    data.append("quantityType", quantityType)
    data.append("price", price)
    data.append("location" , location)
    data.append("images", image)

    try {
      const res = await axios.post("http://localhost:3000/product/newProduct" ,data, {
        withCredentials: true,
        headers:{
          "Content-Type": "multipart/form-data",
          Authorization :`Bearer ${localStorage.getItem("token")}`
        }
      })
      if(res.status === 200){
        console.log(res.data)
      }
    }
     catch (error) {
    
    }
  }  
  const placeholderStyle ={
    border: "none",
    borderBottom: "2px solid #ccc",
    outline: "none",
    background: "transparent",
    padding: "10px 5px",
    color: "#000000",            
    fontSize: "16px",
    marginBottom: "20px",
    width:"25vw"
  }
  return (
    <div style={{background:"#29252c",
      display:"flex",
      flexDirection:'column',
      alignItems:"center",
      justifyContent:"top",
      height:"100vh"}}>
          
      <div style={{border:"1px  solid  black " , 
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  justifyContent:"center",
                  width:"50vw",
                  height:"80vh",
                  boxShadow:"0px 0px 10px rgba(0, 0,0,0.1)",
                  overflow:"hidden",
                  padding:"20px",
                  background:"#d8e9f0",
                  borderRadius:"10px",
                  marginTop:"1vh"
                  }}>
                      <h2 style={{color:"#000000"}}>Enter your Product details</h2>
      <form onSubmit={handleSubmit} style={{ maxHeight: "75vh", overflowY: "auto", width: "100%" , textAlign:"center" }} >
      
      <input type="text" name='title'  placeholder='title' style={placeholderStyle} onChange={(e)=>setTitle(e.target.value)}/>
      <br />
      <input type="text" name='description'  placeholder='description' style={placeholderStyle} onChange={(e)=>setDescription(e.target.value)}/>
      <br />
      <select name="type" id="" onChange={(e)=>setType(e.target.value)}>
      <option value="type">Grains</option>
      <option value="type">Vegetables</option>
      <option value="type"> Fruits</option>
      <option value="type">seeds</option>
      </select>
      
     <br />
      <input type="text" name='subType'  placeholder='subType' style={placeholderStyle} onChange={(e)=>setSubType(e.target.value)}/>
     <br />
      <input type="text" name='quantity'  placeholder='quantity' style={placeholderStyle} onChange={(e)=>setQuantity(e.target.value)}/>
     <br />
      <select name="quantityType" id="" onChange={(e)=>setQuantityType(e.target.value)}>
        <option value="KG">KG</option>
        <option value="Quintal">Quintal</option>
        <option value="ton">ton</option>
      </select>
     <br />
      <input type="text" name='price'  placeholder='price' style={placeholderStyle} onChange={(e)=>setPrice(e.target.value)}/>
     <br />
      <input type="text" name='location'  placeholder='location' style={placeholderStyle} onChange={(e)=>setLocation(e.target.value)}/>
      <br />
      <input type="file" accept='image/*' onChange={handleImage}/>
      <br />
      <button style={{marginTop:"1px", marginBottom:"2px"}} type='submit' >submit</button>
      {preview && (
        <img src={preview} alt=""  style={{width:"50px" , height:"50px"}} />
      )}
      </form>
      </div>
    
  </div>
  )
}

export default UploadProduct
