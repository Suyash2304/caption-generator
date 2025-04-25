import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { WRITING_STYLES } from '../lib/constants';

export const WritingStyleSelector = ({ selectedStyle, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (style) => {
    onChange(style);
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.style-dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative style-dropdown", className)}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span>{selectedStyle}</span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 ml-2 transition-transform", 
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-5 duration-300">
          <ul className="py-1">
            {WRITING_STYLES.map((style) => (
              <li key={style}>
                <button
                  type="button"
                  onClick={() => handleSelect(style)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                    selectedStyle === style && "bg-gray-100 dark:bg-gray-700"
                  )}
                >
                  {style}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
