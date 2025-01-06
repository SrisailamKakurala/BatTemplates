import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={` text-whiteText text-sm py-2 px-4 rounded-lg shadow-2xl transform transition-transform duration-200 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;