import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'  // 修改这里的导入
import './index.css'
import App from './App.jsx'
import api from './API';
// 将 api 添加到全局 window 对象中（可选）
window.$api = api;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>      {/* 修改这里的路由组件 */}
      <App />
    </HashRouter>
  </StrictMode>,
)