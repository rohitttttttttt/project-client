import React from 'react'

function CartCard({ cartItem }) {
  return (
    <div style={{
      backgroundColor: "#1e1e1e",
      width: "400px",
      minHeight: "160px",
      margin: "12px",
      borderRadius: "12px",
      padding: "16px",
      display: "flex",
      gap: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      alignItems: "center",
      color: "#fff"
    }}>
      <div style={{
        width: "100px",
        height: "100px",
        borderRadius: "12px",
        padding: "3px",
        background: "linear-gradient(135deg, #00bfff, #ff1493, #00bfff)",
        backgroundSize: "200% 200%",
        
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#2a2a2a"
        }}>
          <img
            src={cartItem.images}
            alt={cartItem.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px"
        }}>
          <span style={{
            backgroundColor: "#28a745",
            borderRadius: "12px",
            padding: "4px 10px",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#fff"
          }}>
            {cartItem.type}
          </span>

          <span style={{
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "18px"
          }}>✖</span>
        </div>

        <h3 style={{ margin: "6px 0", fontSize: "18px" }}>{cartItem.title}</h3>
        <h2 style={{ margin: "4px 0", fontSize: "16px", fontWeight: "bold", color: "#00bfff" }}>₹{cartItem.price}</h2>

        <select style={{
          marginTop: "8px",
          backgroundColor: "#2a2a2a",
          color: "#fff",
          padding: "6px 10px",
          border: "1px solid #444",
          borderRadius: "6px"
        }}
          defaultValue="0"
        >
          {[...Array(cartItem.quantity)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  )
}

export default CartCard
