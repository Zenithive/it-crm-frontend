// Card.tsx
import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children }) => {
  return (
    <div className={`rounded-lg bg-white shadow-custom ${className}`}>
      {children}
    </div>
  );
};