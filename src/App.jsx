import { useState } from 'react'
import { Route , Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/register'
import Profile from './pages/Profile'
import UploadProduct from './components/UploadProduct'
import SearchPage from './pages/SearchPage'
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
    </Routes>
    </>
   
  )
}

export default App
