import { memo } from 'react';

export const ComparisonDemo = memo(function ComparisonDemo() {
  const radius = 20;
  const padding = 8;
  
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6" role="group" aria-labelledby="comparison-title">
      
      {/* Scenario 1: outer r = inner r */}
      <div className="text-center space-y-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          outer <span className="text-red-500">r</span> = inner <span className="text-red-500">r</span>
        </h3>
        <div 
          className="relative mx-auto" 
          style={{ width: 250, height: 160 }}
          role="img"
          aria-label={`Wrong approach: Both outer and inner containers using ${radius}px radius, showing visual inconsistency`}
        >
          <div
            className="absolute border-3 border-red-500 bg-red-50 dark:bg-red-900/20"
            style={{
              width: 100,
              height: 100,
              borderRadius: radius,
              top: 30,
              left: 75,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute border-2 border-blue-500 bg-blue-100 dark:bg-blue-800/40"
            style={{
              width: 100,
              height: 100,
              borderRadius: radius,
              top: 30,
              left: 75,
            }}
            aria-hidden="true"
          >
            <div className="flex items-center justify-center h-full text-blue-700 dark:text-blue-300 font-mono text-xs">
              <span aria-label={`${radius} pixels`}>
                {radius}px
              </span>
            </div>
          </div>
          <div className="absolute top-2 left-20 text-xs font-mono text-red-600 dark:text-red-400">
            <span aria-label={`Outer radius: ${radius} pixels`}>
              {radius}px
            </span>
          </div>
        </div>
        <p className="text-xs text-red-600 dark:text-red-400 mt-2">
          Visual inconsistency - inner corners appear sharper
        </p>
      </div>
      
      {/* Scenario 2: outer r = inner r + padding */}
      <div className="text-center space-y-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
          outer <span className="text-green-500">r</span> = inner <span className="text-blue-500">r</span> + <span className="text-gray-500">padding</span>
        </h3>
        <div 
          className="relative mx-auto" 
          style={{ width: 250, height: 160 }}
          role="img"
          aria-label={`Correct approach: Outer container using ${radius + padding}px radius, inner container using ${radius}px radius, with ${padding}px padding between them`}
        >
          <div
            className="absolute border-3 border-green-500 bg-green-50 dark:bg-green-900/20"
            style={{
              width: 100 + (padding * 2),
              height: 100 + (padding * 2),
              borderRadius: radius + padding,
              top: 30 - padding,
              left: 75 - padding,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute border-2 border-blue-500 bg-blue-100 dark:bg-blue-800/40"
            style={{
              width: 100,
              height: 100,
              borderRadius: radius,
              top: 30,
              left: 75,
            }}
            aria-hidden="true"
          >
            <div className="flex items-center justify-center h-full text-blue-700 dark:text-blue-300 font-mono text-xs">
              <span aria-label={`${radius} pixels`}>
                {radius}px
              </span>
            </div>
          </div>
          <div className="absolute top-2 left-20 text-xs font-mono text-green-600 dark:text-green-400">
            <span aria-label={`Outer radius: ${radius + padding} pixels`}>
              {radius + padding}px
            </span>
          </div>
        </div>
        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
          Visual harmony - consistent corner curvature
        </p>
      </div>
    </div>
  );
}); 

ComparisonDemo.displayName = 'ComparisonDemo';
