import React, { useEffect, useState } from 'react'
import { userContext } from '../context/userContext';
import { useContext } from 'react';
import API from '../services/api';
import { socket } from '../pages/Home';
import { X } from 'lucide-react'
function BuyNow() {
  const { product, token, addOrderUser, orderUser, user } = useContext(userContext);
  let [price, setPrice] = useState(product.price);
  let [quantity, setQuantity] = useState()
  let [address, setAddress] = useState()
  const placeOrder = () => {
    socket.emit("placeOrder", orderUser._id, user._id, product._id, price, quantity, address)
  }


  useEffect(() => {
    const getTheUserName = async () => {
      const userName = await API.get(`/user/${product.owner}`);
      addOrderUser(userName.data.user);
    };

    getTheUserName()
  }, [])
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0e0e0e"
    }}>

      <div style={{
        background: "#1f1f1f",
        padding: "30px",
        borderRadius: "16px",
        width: "320px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
        color: "#f1f1f1",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: "1.3rem", color: "#ffffff" }}>
            Add order details
          </h2>
          <X />
        </div>
        <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#ffffff" }}>
          Select Quantity
        </h3>


        <select
          name="quantity"
          onChange={(e) => {
            setPrice(product.price * parseInt(e.target.value));
            setQuantity(parseInt(e.target.value));
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#2a2a2a",
            color: "#f1f1f1",
            outline: "none",
          }}
        >
          {[...Array(product.quantity)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>

        <h3 style={{ fontSize: "1.2rem", color: "#00bfff", margin: "0" }}>
          Price: ₹{price}
        </h3>

        <label style={{ fontSize: "0.9rem", color: "#ddd" }}>
          Delivery Address
        </label>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#2a2a2a",
            color: "#f1f1f1",
            outline: "none",
          }}
        />

        <button
          onClick={placeOrder}
          style={{
            marginTop: "1rem",
            padding: "10px 0",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#00bfff",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#00bfff")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#00bfff")}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default BuyNow
