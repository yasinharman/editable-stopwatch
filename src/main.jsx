// StrictMode gelistirme sirasinda olasi hatalari daha erken gormene yardim eder.
import { StrictMode } from 'react'
// createRoot, React uygulamasini index.html icindeki root alanina baglar.
import { createRoot } from 'react-dom/client'
// Global stiller burada yuklenir; bu import degisirse tum uygulamanin temel stili etkilenir.
import './index.css'
// Ekranda gordugun ana arayuz bu dosyadan gelir.
import App from './App.jsx'

// root hedefi degisirse uygulamanin nereye render edilecegi de degisir.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
