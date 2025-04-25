import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { PLATFORMS, PLATFORM_INFO } from '../lib/constants';

export const PlatformSelector = ({
  selectedPlatform,
  onChange,
  className
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSelect = (platform) => {
    onChange(platform);
    closeDropdown();
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (!target.closest('.platform-dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative platform-dropdown", className)}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span>{selectedPlatform}</span>
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
            {PLATFORMS.map((platform) => (
              <li key={platform}>
                <button
                  type="button"
                  onClick={() => handleSelect(platform)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center",
                    selectedPlatform === platform && "bg-gray-100 dark:bg-gray-700"
                  )}
                >
                  <span 
                    className={cn(
                      "inline-block w-3 h-3 rounded-full mr-2",
                      PLATFORM_INFO[platform].color
                    )}
                  ></span>
                  {platform}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
