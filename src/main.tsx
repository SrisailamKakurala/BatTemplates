import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from '@/hooks/ui/useToast.tsx'
import Modal from "react-modal";

Modal.setAppElement("#root");

createRoot(document.getElementById('root')!).render(
    <ToastProvider>
      <App />
    </ToastProvider>
)
