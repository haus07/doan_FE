import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

// 1. Redux (Bắt buộc phải có để Navbar hoạt động)
import { Provider } from 'react-redux'
import { store } from './store'

// 2. React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 3. Contexts
import PlayerContextProvider from './context/PlayerContext'
import PopupContextProvider from './context/PopUpContext'
import JWTProvider from './context/JwtContext'

// Tạo client cho React Query
const queryClient = new QueryClient()

// TypeScript: Cần dấu ! để khẳng định element 'root' luôn tồn tại
const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <StrictMode>
    {/* Bọc Redux Provider ở ngoài cùng để cả App truy cập được Store */}
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <JWTProvider>
          <PopupContextProvider>
            <PlayerContextProvider>
              <App />
            </PlayerContextProvider>
          </PopupContextProvider>
        </JWTProvider>
        </Provider>
      </QueryClientProvider>
        </BrowserRouter>
  </StrictMode>,
)