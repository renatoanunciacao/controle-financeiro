import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_APP_GOOGLE_CLIENT_ID?.toString()}`}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
