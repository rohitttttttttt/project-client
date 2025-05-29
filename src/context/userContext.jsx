import {createContext, useContext, useState} from "react";

 export const userContext = createContext();

export const AuthData =  ({children}) => {
    let[user , setUser]= useState({});
    let[token , setToken]=useState();
    let[ search , setSearch] =useState("");
    let[product , setProduct ]= useState({})
    let[cartopen , setCartOpen] =useState(false);
    let[cartItem , setCartitem] = useState([])
    let [chatUser , setChatUser] = useState()
    

    const login= (userData , Atoken)=>{
        setUser(userData);
        setToken(Atoken)
        localStorage.setItem("user" , JSON.stringify(userData))
        
       
    }
    const logout =()=>{
        setUser({});
       
    }
    const searchInput =(searchString)=>{
        setSearch(searchString);
    }

    const setViewProduct =(productToSet)=>{
        setProduct(productToSet)
    }
    const handleCartClick =()=>{
        setCartOpen(!cartopen)
    }
    const addCartItem =(itemToAdd)=>{
        setCartitem((prev)=>[...prev , itemToAdd])
    }

    const addChatUser =(user)=>{
        setChatUser(user)
    }

    return(
        <userContext.Provider value={{user ,search, product,login , logout , searchInput , setViewProduct , cartopen , handleCartClick , addCartItem , cartItem , token , addChatUser, chatUser}}>
            {children}
        </userContext.Provider>
    )
}
