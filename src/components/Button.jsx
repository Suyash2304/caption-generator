import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '../lib/utils';
import { Sparkles } from 'lucide-react';

export const Button = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  loading = false,
  disabled,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-purple-600 hover:bg-purple-700 text-white',
    outline: 'bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50',
    ghost: 'bg-transparent hover:bg-purple-50 text-purple-600',
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2.5',
    lg: 'text-lg px-6 py-3',
  };

  const baseClasses =
    'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center';

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size="sm" className="mr-2" />
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export const GenerateButton = (props) => {
  return (
    <Button icon={<Sparkles size={18} />} {...props}>
      Inspire Me
    </Button>
  );
};
