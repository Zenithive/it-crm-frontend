// CardHeader.tsx
import React from 'react';

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children }) => {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  );
};