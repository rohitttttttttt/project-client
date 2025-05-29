import React from 'react';
import ChatCard from '../components/ChatCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
import {socket} from '../pages/Home'
import axios from 'axios';

export default function ChatPage() {
   const {user , chatUser , token} = useContext(userContext)
    
    let[messageToSend , setMessageToSend] = useState()
   
    let[messageToDisplay , setMessageToDisplay] = useState([])

    useEffect(()=>{
        socket.on("message2" , (finalMessage)=>{

        setMessageToDisplay((prev)=>[...prev , ...finalMessage])
        alert("recived message from")
    })
    },[])

   useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:3000/chat/getChat", {
        withCredentials: true,
        headers: {
          "Authorization": token
        },
        params: { id: chatUser._id }
      });
      console.log(res.data.message); 
      setMessageToDisplay(res.data.messageToSend);

    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  fetchMessages();
}, [chatUser._id, token]);

    function example (){
       
         setMessageToDisplay((prev)=>[...prev , {owner:true , msg:messageToSend , id:Math.random()*69}])
         socket.emit("message1" , messageToSend , user._id , chatUser._id )
    }
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      padding: '16px', 
      backgroundColor: '#f0f4f8', 
      width:"50%"
    }}>
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            padding: '12px', 
            borderTop: '1px solid #ccc', 
            position: 'sticky', 
            top: 0 ,
            backgroundColor: '#f0f4f8',
            height:"20px",
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
            <h3>{chatUser.userName}</h3>
            <h3>back</h3>
        </div>
      
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        paddingRight: '8px' 
      }}>
        {messageToDisplay.map((index)=><ChatCard key={index.id } decider={index.owner} message={index.msg}/>)}
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        padding: '12px', 
        borderTop: '1px solid #ccc', 
        backgroundColor: '#fff', 
        position: 'sticky', 
        bottom: 0 
      }}>
        <input 
          type="text" 
          placeholder="Type your message..."
           onChange={(e) => setMessageToSend(e.target.value)}
          style={{ 
            flex: 1, 
            padding: '8px 12px', 
            border: '1px solid #ccc', 
            borderRadius: '20px', 
            outline: 'none' 
          }} 
        />
        <button  
        onClick={example}
        style={{ 
          padding: '8px 16px', 
          borderRadius: '20px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer' 
        }}>
          Send
        </button>
      </div>

    </div>
  );
}
