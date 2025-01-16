import React, { createContext, useContext, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { v4 as uuidv4 } from 'uuid'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToastContextType {
  addToast: (message: string, type: Toast['type'], duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast['type'], duration: number = 3000) => {
    const id = uuidv4()
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }])
    setTimeout(() => removeToast(id), duration)
  }

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 space-y-1 z-50">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`flex items-center py-3 px-4 rounded-sm shadow-lg text-whiteText transform transition-all ${
                toast.type === 'success'
                  ? 'bg-green-500'
                  : toast.type === 'error'
                  ? 'bg-primary'
                  : toast.type === 'info'
                  ? 'bg-blue-500'
                  : 'bg-yellow-500'
              }`}
            >
              <span className="flex-grow text-lg">{toast.message}</span>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
