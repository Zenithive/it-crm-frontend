// CardTitle.tsx
import React from 'react';

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className = '', children }) => {
  return (
    <h3 className={`text-xl font-bold leading-none  ${className}`}>
      {children}
    </h3>
  );
};