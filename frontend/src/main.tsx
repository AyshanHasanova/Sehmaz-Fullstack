import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' // Devtools əlavə edildi
import { Toaster } from 'react-hot-toast' // Bildirişlər üçün əlavə edildi
import './index.css'
import App from './App.tsx'

// 1. QueryClient konfiqurasiyası
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      retry: 1,
      staleTime: 1000 * 60 * 5, // Datalar 5 dəqiqə "təzə" qalsın (lazımsız sorğuların qarşısını alır)
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* 2. Proqramın istənilən yerindən toast bildirişlərini çağıra bilmək üçün */}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: '#333',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 'bold'
          },
        }}
      />
      
      <App />

      {/* 3. Brauzerin aşağı sağ küncündə data axınını izləmək üçün panel (yalnız development-də görünür) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)