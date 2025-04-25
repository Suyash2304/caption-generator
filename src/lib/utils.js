import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text) {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((resolve) => {
      try {
        document.execCommand('copy') 
          ? resolve(true) 
          : resolve(false);
      } catch (err) {
        resolve(false);
      } finally {
        document.body.removeChild(textArea);
      }
    });
  }

  return navigator.clipboard.writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function getWordCount(text) {
  return text.trim().split(/\s+/).length;
}

export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
