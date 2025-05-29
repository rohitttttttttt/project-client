import { useEffect, useState , useContext } from 'react'
import { Route , Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/register'
import Profile from './pages/Profile'
import UploadProduct from './components/UploadProduct'
import SearchPage from './pages/SearchPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import MeassagePage from './pages/MeassagePage'
import ChatPage from './pages/ChatPage'

import { userContext } from './context/userContext'


function App() {
 
  return (
    <>
    <Navbar/>
     <Routes>
     <Route path="/home" element={<Home/>}/>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/uploadProduct" element={<UploadProduct/>}/>
      <Route path="/Search" element={<SearchPage/>}/>
      <Route path="/productPage" element={<ProductPage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/message" element={<MeassagePage/>}/>
      <Route path="/chat" element={<ChatPage/>}/>
    </Routes>
    </>
   
  )
}

export default App
