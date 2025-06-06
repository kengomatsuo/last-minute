import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './contexts/UserContext'
import { AnimatePresence } from 'framer-motion'
import { ScreenContextProvider } from './contexts/ScreenContext.jsx'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ScreenContextProvider>
    <UserContextProvider>
      <BrowserRouter basename='/last-minute/'>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </ScreenContextProvider>
)
