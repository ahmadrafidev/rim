'use client';

import { memo, useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggle = memo(function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-300 dark:border-gray-600 shadow-sm">
        <div className="flex items-center justify-center p-2 rounded-md w-8 h-8">
          <Monitor size={16} className="text-gray-400" />
        </div>
      </div>
    );
  }

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-300 dark:border-gray-600 shadow-sm">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            relative flex items-center justify-center p-2 rounded-md transition-colors duration-200
            focus:outline-none focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800
            ${theme === value 
              ? 'bg-blue-500 text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }
          `}
          aria-label={`Switch to ${label.toLowerCase()} theme`}
          aria-pressed={theme === value}
          title={`${label} theme`}
          type="button"
        >
          <Icon 
            size={16} 
            className="transition-colors"
            aria-hidden="true"
          />
          <span className="sr-only">{label}</span>
          
        </button>
      ))}
      
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Current theme: {theme}
        {theme === 'system' && `, resolved to ${resolvedTheme}`}
      </div>
    </div>
  );
}); 