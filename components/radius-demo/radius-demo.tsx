import type { RadiusDemoProps } from '@/types';

/**
 * Visual demonstration component showing the relationship between radii
 */
export function RadiusDemo({ 
  outerRadius, 
  innerRadius, 
  padding, 
  dimension 
}: RadiusDemoProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: dimension + 100, height: dimension + 100 }}>
      {/* Outer container */}
      <div
        className="relative border-4 border-green-500 bg-green-50 dark:bg-green-900/20 flex items-center justify-center"
        style={{
          width: dimension,
          height: dimension,
          borderRadius: outerRadius,
        }}
      >
        {/* Padding visualization */}
        <div
          className="border-2 border-dashed border-gray-400 dark:border-gray-600"
          style={{
            width: dimension - (padding * 2),
            height: dimension - (padding * 2),
            borderRadius: innerRadius,
          }}
        />
        
        {/* Inner content area */}
        <div
          className="absolute bg-blue-200 dark:bg-blue-800/40 border-2 border-blue-500"
          style={{
            width: dimension - (padding * 2),
            height: dimension - (padding * 2),
            borderRadius: innerRadius,
          }}
        >
          <div className="flex items-center justify-center h-full text-blue-700 dark:text-blue-300 font-mono text-sm">
            {innerRadius}px
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-6 left-2 text-sm md:text-base font-mono text-green-700 dark:text-green-400">
        {outerRadius}px
      </div>
      <div className="absolute bottom-6 right-0 text-sm md:text-base font-mono text-gray-700 dark:text-gray-400">
        {padding}px
      </div>
    </div>
  );
} 