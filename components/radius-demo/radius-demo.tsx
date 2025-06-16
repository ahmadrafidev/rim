import { memo } from 'react';
import type { RadiusDemoProps } from '@/types';

export const RadiusDemo = memo(function RadiusDemo({ 
  outerRadius, 
  innerRadius, 
  padding, 
  dimension 
}: RadiusDemoProps) {
  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ width: dimension + 100, height: dimension + 100 }}
      role="img"
      aria-labelledby="radius-demo-title"
      aria-describedby="radius-demo-description"
    >

      {/* Outer container */}
      <div
        className="relative border-4 border-green-500 bg-green-50 dark:bg-green-900/20 flex items-center justify-center"
        style={{
          width: dimension,
          height: dimension,
          borderRadius: outerRadius,
        }}
        aria-label={`Outer container with ${outerRadius}px border radius`}
      >
        {/* Padding visualization */}
        <div
          className="border-2 border-dashed border-gray-400 dark:border-gray-600"
          style={{
            width: dimension - (padding * 2),
            height: dimension - (padding * 2),
            borderRadius: innerRadius,
          }}
          aria-hidden="true"
        />
        
        {/* Inner content area */}
        <div
          className="absolute bg-blue-200 dark:bg-blue-800/40 border-2 border-blue-500"
          style={{
            width: dimension - (padding * 2),
            height: dimension - (padding * 2),
            borderRadius: innerRadius,
          }}
          aria-label={`Inner content with ${innerRadius}px border radius`}
        >
          <div className="flex items-center justify-center h-full text-blue-700 dark:text-blue-300 font-mono text-sm font-semibold">
            <span aria-label={`Inner radius: ${innerRadius} pixels`}>
              {innerRadius}px
            </span>
          </div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-6 left-2 text-sm md:text-base font-mono text-green-700 dark:text-green-400 font-semibold">
        <span aria-label={`Outer radius: ${outerRadius} pixels`}>
          {outerRadius}px
        </span>
      </div>
      
      <div className="absolute bottom-6 right-0 text-sm md:text-base font-mono text-gray-700 dark:text-gray-400 font-semibold">
        <span aria-label={`Padding: ${padding} pixels`}>
          {padding}px
        </span>
      </div>
    </div>
  );
}); 

RadiusDemo.displayName = 'RadiusDemo';
