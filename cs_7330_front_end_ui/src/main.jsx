import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'  // 修改这里的导入
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>      {/* 修改这里的路由组件 */}
      <App />
    </HashRouter>
  </StrictMode>,
)