import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-lg font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-havilah-gold to-havilah-goldLight text-havilah-black shadow-lg shadow-havilah-gold/20 hover:shadow-havilah-gold/40",
    secondary: "bg-havilah-card text-havilah-champagne border border-havilah-gold/20 hover:border-havilah-gold/50",
    outline: "bg-transparent border border-havilah-gold text-havilah-gold hover:bg-havilah-gold/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};