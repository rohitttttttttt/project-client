import {createContext, useContext, useState} from "react";

 export const userContext = createContext();

export const AuthData =  ({children}) => {
    let[user , setUser]= useState({});
    let[token , setToken]=useState()
    

    const login= (userData , Atoken)=>{
        setUser(userData);
        setToken(Atoken)
        localStorage.setItem("user" , JSON.stringify(userData))
        localStorage.setItem("token" , Atoken)
        console.log(userData)
       
    }
    const logout =()=>{
        setUser({});
       
    }

    return(
        <userContext.Provider value={{user  , login , logout}}>
            {children}
        </userContext.Provider>
    )
}
