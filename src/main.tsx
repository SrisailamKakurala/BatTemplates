import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from '@/hooks/ui/useToast.tsx'

createRoot(document.getElementById('root')!).render(
    <ToastProvider>
      <App />
    </ToastProvider>
)
