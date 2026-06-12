import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// No StrictMode: double-invoked effects re-trigger one-shot GSAP intro
// timelines in dev, which makes motion review unreliable.
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
    <App />
  </BrowserRouter>
)
