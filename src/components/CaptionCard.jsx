import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn, copyToClipboard, getWordCount } from '../lib/utils';
import { PLATFORM_INFO } from '../lib/constants';

export const CaptionCard = ({ caption, className }) => {
  const [copied, setCopied] = useState(false);
  const { platform, text, topic, style } = caption;
  const { color, textColor, charLimit } = PLATFORM_INFO[platform];
  
  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const characterCount = text.length;
  const wordCount = getWordCount(text);
  const isNearLimit = characterCount > charLimit * 0.8;
  const isOverLimit = characterCount > charLimit;

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700",
      className
    )}>
      <div className={cn(
        "px-4 py-2 flex justify-between items-center",
        color,
        textColor
      )}>
        <div className="flex items-center">
          <span className="font-medium">{platform}</span>
        </div>
        <div className="flex items-center text-sm">
          <span>Writing Style:</span>
          <span className="ml-1 font-medium">{style}</span>
        </div>
      </div>
      
      {topic && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Topic: </span>
          <span className="text-sm">{topic}</span>
        </div>
      )}
      
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{text}</p>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span className={cn(
            isOverLimit ? "text-red-500" : isNearLimit ? "text-amber-500" : ""
          )}>
            {characterCount}/{charLimit} characters
          </span>
          <span className="mx-2">•</span>
          <span>{wordCount} words</span>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};
