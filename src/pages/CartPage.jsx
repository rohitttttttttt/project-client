import React from 'react'
import CartCard from '../components/cartCard'
import { useContext } from 'react'
import { userContext } from '../context/userContext'

function CartPage() {
    const { handleCartClick , cartItem} = useContext(userContext)

    return (
        <div style={{
            position: "fixed",
            top:10, right: 0,
            width: "30vw",
            height: "100vh",
            display: "flex",
            zIndex: 2000,
            boxShadow: '-4px 0 10px rgba(15, 1, 1, 0.4)',
        }}>
            <div style={{
                backgroundColor: "#29252c",
                width: "100%",
                maxHeight: "100vh",
                overflowY: "auto",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    marginBottom: "10px",
                    
                    top: 0,
                    backgroundColor: "#29252c",
                    zIndex: 10,
                }}>
                    <h1>Cart</h1>
                    <h1 style={{ cursor: "pointer" }} onClick={handleCartClick}>X</h1>
                </div>
                {cartItem.map((item)=>(<CartCard
                 key={item._id} cartItem={item} />))}
            </div>
        </div>
    )
}

export default CartPage
