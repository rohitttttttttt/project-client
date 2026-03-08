import React, { useEffect, useState } from 'react';
import { userContext } from '../context/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import BuyNow from '../components/BuyNow';
import { socket } from './Home';

function ProfileProductPage() {

  const { product, token, addChatUser } = useContext(userContext);
  let [flag, setFlag] = useState(false);
  let [farmer, setFarmer] = useState()
  const navigate = useNavigate();


  const getTheUserName = async () => {
    const userName = await API.get(`/user/${product.owner}`);
    addChatUser(userName.data.user);
    setFarmer(userName.data.user.userName)

  };
  useEffect(() => {
    getTheUserName()
  }, [])

  const sampleImages = [
    'https://th.bing.com/th/id/OIP.OklthbvijH4PW0Z9woRiZQAAAA?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.AD81ybHpkY19mstXr50tvQHaE7?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.1gvhBeknuKOmIYJRGNe6NgHaGN?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.Utzq3NeW4XsuYosIFOepIgHaE8?w=1024&h=683&rs=1&pid=ImgDetMain'
  ];

  useEffect(() => {
    socket.on("feedback", (feed) => {
      if (feed) {
        alert("order placed successfully ")
      }
      setFlag(false)
    })
  }, [])

  if (!flag) {
    return (
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          maxHeight: '100vh',
          maxWidth: "100vw",
          padding: '12vh',
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5vw',
          alignItems: 'start',
          justifyContent: 'center',
          alignSelf: "center",
          marginTop: "20px"
        }}
      >

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <img
            src={product.images || sampleImages[0]}
            alt=""
            style={{ width: '100%', height: '60vh', borderRadius: '10px', objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', gap: '1rem' }}>
            {sampleImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`product-${idx}`}
                style={{
                  width: '100px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)'
                }}
                onClick={() => (product.images = img)}
              />
            ))}
          </div>
        </div>


        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h1 style={{ fontSize: '2rem' }}>{product.title}</h1>
          <h2 style={{ color: '#f33535' }}>Rs {product.price}</h2>
          <p>Farmer: {farmer}</p>
          <p>Type: {product.type}</p>
          <p>Available: {product.quantity}</p>
          <p>Location: {product.location}</p>
          <p>{product.description}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button >edit</button>
            <button >delete</button>


          </div>
        </div>
      </div>

    );

  } else {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

        <BuyNow />
      </div>
    )

  }
}

export default ProfileProductPage;
