import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Hide the initial HTML loader once React is mounted
requestAnimationFrame(() => {
  const loader = document.getElementById('app-loader')
  if (!loader) return
  loader.classList.add('is-hidden')
  window.setTimeout(() => loader.remove(), 320)
})
