import React, { useState, useContext } from 'react'
import API from '../services/api'
import { userContext } from '../context/userContext'

function UploadProduct() {
  const { token } = useContext(userContext)

  let [title, setTitle] = useState("")
  let [description, setDescription] = useState("")
  let [type, setType] = useState("")
  let [subType, setSubType] = useState("")
  let [quantity, setQuantity] = useState()
  let [quantityType, setQuantityType] = useState()
  let [price, setPrice] = useState("")
  let [location, setLocation] = useState("")
  let [image, setImage] = useState()
  let [preview, setPreview] = useState()

  const handleImage = (e) => {
    const selected = e.target.files[0]
    setImage(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("title", title)
    data.append("description", description)
    data.append("type", type)
    data.append("subType", subType)
    data.append("quantity", quantity)
    data.append("quantityType", quantityType)
    data.append("price", price)
    data.append("location", location)
    data.append("images", image)

    try {
      const res = await API.post("/product", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token
        }
      })
      if (res.status === 200) {

      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{
      background: "#171717",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "#1e1e1e",
        padding: "30px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)"
      }}>
        <h2 style={{ color: "#00bfff", marginBottom: "20px", textAlign: "center" }}>Upload Product</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />

          <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
            <option value="">Select Type</option>
            <option value="Grains">Grains</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Seeds">Seeds</option>
          </select>

          <input type="text" placeholder="Sub-Type" value={subType} onChange={(e) => setSubType(e.target.value)} style={inputStyle} />
          <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={inputStyle} />

          <select value={quantityType} onChange={(e) => setQuantityType(e.target.value)} style={inputStyle}>
            <option value="">Select Unit</option>
            <option value="KG">KG</option>
            <option value="Quintal">Quintal</option>
            <option value="Ton">Ton</option>
          </select>

          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} />

          <input type="file" accept="image/*" onChange={handleImage} style={{ color: "#fff" }} />

          {preview && <img src={preview} alt="Preview" style={{ width: "60px", height: "60px", borderRadius: "8px", marginTop: "5px" }} />}

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: "10px",
  background: "transparent",
  border: "none",
  borderBottom: "2px solid #444",
  color: "#fff",
  fontSize: "14px"
}

const buttonStyle = {
  padding: "10px",
  background: "#00bfff",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px"
}

export default UploadProduct
