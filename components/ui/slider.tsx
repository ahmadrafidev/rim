import { useId } from 'react';

import type { SliderProps } from '@/types';

export function Slider({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  onChange, 
  unit = 'px',
  note 
}: SliderProps) {
  const sliderId = useId();
  const noteId = useId();
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label 
          htmlFor={sliderId} 
          className="text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <div className="flex items-center gap-2">
                  <span 
          className={`px-2 py-1 text-sm font-bold font-mono rounded-md border min-w-[3rem] text-center shadow-sm
                     ${value === max 
                       ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700' 
                       : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700'
                     }`}
          aria-live="polite"
          aria-atomic="true"
          title={value === max ? 'Maximum value reached' : undefined}
        >
          {value}{unit}
        </span>
        </div>
      </div>
      
      <div className="relative group">
        {/* Track background */}
        <div className="absolute top-1/2 left-0 w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2 shadow-inner" />
        
        {/* Progress track */}
        <div 
          className="absolute top-1/2 left-0 h-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-300 dark:to-gray-100 rounded-full pointer-events-none -translate-y-1/2 shadow-sm"
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        />
        
        {/* Slider input */}
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${label}: ${value}${unit}`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value}${unit}`}
          aria-describedby={note ? noteId : undefined}
          className="relative w-full h-3 bg-transparent rounded-full appearance-none cursor-pointer z-10
                     focus:outline-none focus:ring-4 focus:ring-gray-500/20
                     
                     [&::-webkit-slider-track]:bg-transparent [&::-webkit-slider-track]:h-3 [&::-webkit-slider-track]:rounded-full
                     
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
                     [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300
                     [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-gray-400/50
                     [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-xl
                     [&::-webkit-slider-thumb]:hover:shadow-gray-600/40 [&::-webkit-slider-thumb]:hover:border-gray-600
                     [&::-webkit-slider-thumb]:active:scale-105 [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:focus:ring-4 [&::-webkit-slider-thumb]:focus:ring-gray-500/20
                     [&::-webkit-slider-thumb]:focus:border-gray-700 [&::-webkit-slider-thumb]:focus:shadow-gray-700/40
                     
                     dark:[&::-webkit-slider-thumb]:bg-gray-100 dark:[&::-webkit-slider-thumb]:border-gray-600
                     dark:[&::-webkit-slider-thumb]:shadow-gray-900/50 dark:[&::-webkit-slider-thumb]:hover:border-gray-400
                     dark:[&::-webkit-slider-thumb]:hover:shadow-gray-400/30 dark:[&::-webkit-slider-thumb]:focus:border-gray-400
                     
                     [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:h-3 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:border-0
                     
                     [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-300
                     [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:hover:shadow-xl
                     [&::-moz-range-thumb]:hover:border-gray-600 [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:active:scale-105 [&::-moz-range-thumb]:border-solid
                     [&::-moz-range-thumb]:focus:border-gray-700 [&::-moz-range-thumb]:focus:ring-4"
        />
        
        {/* Value indicator tooltip */}
        <div 
          className="absolute -top-12 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 
                     px-2 py-1 rounded-md text-xs font-semibold opacity-0 group-hover:opacity-100 
                     transition-opacity duration-75 pointer-events-none whitespace-nowrap
                     after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 
                     after:border-4 after:border-transparent after:border-t-gray-900 dark:after:border-t-gray-100"
          style={{ left: `calc(${percentage}% - 1rem)` }}
        >
          {value}{unit}
        </div>
      </div>
      
      {note && (
        <div 
          id={noteId}
          className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 
                     px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                     flex items-start gap-2"
          role="note"
        >
          <span className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" aria-hidden="true">💡</span>
          <span className="leading-relaxed">{note}</span>
        </div>
      )}
    </div>
  );
} 