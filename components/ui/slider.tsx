import type { SliderProps } from '@/types';

/**
 * Custom slider component for consistent styling
 */
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
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
          {value}{unit}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer 
                     [&::-webkit-slider-track]:bg-gray-200 [&::-webkit-slider-track]:dark:bg-gray-700 
                     [&::-webkit-slider-track]:rounded-lg [&::-webkit-slider-track]:h-2
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 
                     [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-zinc-700 [&::-webkit-slider-thumb]:border-2 
                     [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md
                     [&::-webkit-slider-thumb]:hover:bg-zinc-800 [&::-webkit-slider-thumb]:transition-colors
                     [&::-moz-range-track]:bg-gray-200 [&::-moz-range-track]:dark:bg-gray-700 
                     [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:h-2 [&::-moz-range-track]:border-0
                     [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-zinc-700 [&::-moz-range-thumb]:border-2 
                     [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md
                     [&::-moz-range-thumb]:hover:bg-zinc-800 [&::-moz-range-thumb]:transition-colors
                     [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-solid"
        />
        {/* Visual track progress */}
        <div 
          className="absolute top-1/2 left-0 h-2 bg-zinc-700 rounded-l-lg pointer-events-none -translate-y-1/2"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
      {note && (
        <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 
                      px-2 py-1 rounded border-l-2 border-amber-400">
          💡 {note}
        </p>
      )}
    </div>
  );
} 