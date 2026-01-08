import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './Components/Context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter asename="/olx-clone">
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </AuthProvider>
  </BrowserRouter>
)
