import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.jsx'
import Search from './components/features/Search.jsx'

// 1. Import thêm 2 món này từ thư viện React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. Tạo một cái biến client ở ngoài (để dùng chung cho toàn app)
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Bọc QueryClientProvider ở vòng ngoài cùng (hoặc trong StrictMode đều được) */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)