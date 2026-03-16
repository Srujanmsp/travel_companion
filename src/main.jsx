import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { TripProvider } from './context/TripContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from "react-hot-toast";
import './index.css'

const GOOGLE_CLIENT_ID = "426094167458-ateskglsh6opbtfaqsqa30jmabgneo61.apps.googleusercontent.com"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <TripProvider>
          <App />
          <Toaster position="top-right" />
        </TripProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
