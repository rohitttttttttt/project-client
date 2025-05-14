import React, { useEffect, useState , useContext } from 'react'
import { userContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

// const {login} = useContext(userContext)

function SignUp() {
    const navigate = useNavigate();
    const {login} = useContext(userContext)
    let [userName , setuserName]= useState("")
    let [password , setPassword] = useState("")
    let[fullName, setFullName ]= useState("")
    let[state , setState]= useState("")
    let[city, setCity ]= useState("")
    let[pincode, setPincode ]= useState()
    let[phone , setPhone]= useState()
    let[email , setEmail ]= useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const  formData = {
            "userName":userName,
            "password":password,
            "fullName":fullName,
            "state":state,
            "city":city,
            "pincode":pincode,
            "phone":phone,
            "email": email,
        }

        try {
            const res= await fetch("http://localhost:3000/user/register" , {
                method:"POST",
                body:JSON.stringify(formData),
                headers:{
                     "Content-Type": "application/json"
                },
                credentials:"include"

            })
            if(res.ok){
                const data = await res.json();
                login(data.safeUser  , data. accessToken)

                console.log(data)
                //alert("ha ha hA HA ")
                setuserName("");
                setPassword("");
                setFullName("");
                setState("");
                setCity("");
                setPincode("");
                setPhone("");
                setEmail("");
               navigate("/home")
            }else{
                alert("something went wrong please try again later ")
            }
            

        } catch (error) {
            console.log("regiter error while fetching: " + error)
        } 
       
 
    }

   
    const placeholderStyle ={
        border: "none",
        borderBottom: "2px solid #ccc",
        outline: "none",
        background: "transparent",
        padding: "10px 5px",
        color: "#000000",              // your input text color
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
                        <h2 style={{color:"#000000"}}>Register here</h2>
        <form style={{ maxHeight: "75vh", overflowY: "auto", width: "100%" , textAlign:"center" }} onSubmit={handleSubmit}>
        
        <input type="text" name='userName'  placeholder='userName' style={placeholderStyle} onChange={(e)=>setuserName(e.target.value)}/>
        <br />
        <input type="text" name='fullName'  placeholder='fullName' style={placeholderStyle} onChange={(e)=>setFullName(e.target.value)}/>
        <br />
        <input type="text" name='password'  placeholder='password' style={placeholderStyle} onChange={(e)=>setPassword(e.target.value)}/>
       <br />
        <input type="text" name='email'  placeholder='email' style={placeholderStyle} onChange={(e)=>setEmail(e.target.value)}/>
       <br />
        <input type="text" name='phoneNumber'  placeholder='phoneNumber' style={placeholderStyle} onChange={(e)=>setPhone(e.target.value)}/>
       <br />
        <input type="text" name='state'  placeholder='state' style={placeholderStyle} onChange={(e)=>setState(e.target.value)}/>
       <br />
        <input type="text" name='city'  placeholder='city' style={placeholderStyle} onChange={(e)=>setCity(e.target.value)}/>
       <br />
        <input type="text" name='pincode'  placeholder='pinCode' style={placeholderStyle} onChange={(e)=>setPincode(e.target.value)}/>
        <br />
        <button style={{marginTop:"1px", marginBottom:"2px"}} type='submit'>submit</button>
        </form>
        </div>
      
    </div>
  )
}

export default SignUp
