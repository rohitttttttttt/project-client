import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthData } from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthData>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </AuthData>
    
   
    
  </StrictMode>,
)
