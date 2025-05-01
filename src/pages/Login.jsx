import React, { useState } from 'react'

function Login() {
    const placeholderStyle ={
        border: "none",
        borderBottom: "2px solid #ccc",
        outline: "none",
        background: "transparent",
        padding: "10px 5px",
        color: "#fff",              
        fontSize: "16px",
        marginBottom: "20px",
        width:"25vw"
      }

    let [userName , setuserName]= useState("")
    let [password , setPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const  formData = {
            "userName":userName,
            "password":password,
            
        }

        try {
            const res= await fetch("http://localhost:3000/user/login" , {
                method:"POST",
                body:JSON.stringify(formData),
                headers:{
                     "Content-Type": "application/json"
                }

            })
            const data = await res.json();
            console.log(data)
            alert("ha ha hA HA ")
            setuserName("");
            setPassword("");

        } catch (error) {
            console.log("login error while fetching: " + error)
        } 
       

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
                        <h2 style={{color:"#000000"}}>login here</h2>
        <form action="" style={{ maxHeight: "75vh", overflowY: "auto", width: "100%" , textAlign:"center" } } onSubmit={handleSubmit}>
            <input type="text" placeholder='username / email' style={placeholderStyle} onChange={(e)=>setuserName(e.target.value)} />
            <input type="text" placeholder='password' style={placeholderStyle} onChange={(e)=>setPassword(e.target.value)} />
            <br />
            <button type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
