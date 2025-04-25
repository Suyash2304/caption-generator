import React from 'react';
import { cn } from '../lib/utils';

export const CaptionInput = ({
  value,
  onChange,
  placeholder = 'Tell us the Topic/Details of the Post...',
  className
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("w-full", className)}>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all min-h-[80px]"
        rows={3}
      />
    </div>
  );
};
