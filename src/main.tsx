import { Analytics } from "@vercel/analytics/react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './features/store/index.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './core/query/queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
