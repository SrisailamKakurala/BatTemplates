import React from 'react'

interface ButtonProps {
  label: string
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-whiteText text-sm py-2 px-4 rounded-lg shadow-2xl transform transition-transform duration-200 ${className}`}
    >
      {icon && <span className="mr-2 ">{icon}</span>}
      {label}
    </button>
  )
}

export default Button
