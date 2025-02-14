import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SongProvider } from './context/SongContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserContextProvider } from './context/AuthUserContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  // <StrictMode>  
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>

        <SongProvider >
          <BrowserRouter >
            <App />
          </BrowserRouter>
        </SongProvider>

      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  
)
