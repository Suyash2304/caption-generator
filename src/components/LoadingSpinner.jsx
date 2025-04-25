import React from 'react';
import { cn } from '../lib/utils';

export const LoadingSpinner = ({ 
  size = 'md',
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div 
      className={cn(
        "inline-block rounded-full border-transparent border-t-purple-600 animate-spin",
        sizeClasses[size],
        className
      )} 
    />
  );
};
