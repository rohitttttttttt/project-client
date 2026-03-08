import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import SearchPage from './pages/SearchPage'
import BrowsePage from './pages/BrowsePage'
import ProductPage from './pages/ProductPage'
import CheckoutPage from './pages/CheckoutPage'
import ChatPage from './pages/ChatPage'
import MainLayout from './layout/MainLayout'
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="productPage" element={<ProductPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
