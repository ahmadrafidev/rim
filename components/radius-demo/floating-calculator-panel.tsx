import { ChevronDown, ChevronUp } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import type { FloatingCalculatorPanelProps, PanelPosition } from '@/types';

/**
 * Floating Interactive Calculator Panel
 */
export function FloatingCalculatorPanel({
  position,
  onPositionChange,
  borderRadius,
  innerRadius,
  setInnerRadius,
  padding,
  setPadding,
  dimension,
  setDimension,
  maxPadding,
  isCollapsed,
  setIsCollapsed
}: FloatingCalculatorPanelProps) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Interactive Calculator
        </h3>
        <div className="flex items-center gap-2">
          {/* Position selector */}
          <select
            value={position}
            onChange={(e) => onPositionChange(e.target.value as PanelPosition)}
            className="text-xs bg-gray-100 dark:bg-gray-700 border-0 rounded px-2 py-1 text-gray-900 dark:text-gray-100"
          >
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
          {/* Collapse button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {/* Controls */}
          <div className="space-y-3">
            <Slider
              label="Inner Radius"
              value={innerRadius}
              min={0}
              max={50}
              onChange={setInnerRadius}
              note="Set your desired inner content radius first"
            />
            
            <Slider
              label="Padding"
              value={padding}
              min={0}
              max={maxPadding}
              onChange={setPadding}
              note="The spacing between outer and inner elements"
            />
            
            <Slider
              label="Dimension"
              value={dimension}
              min={100}
              max={400}
              onChange={setDimension}
              note="This only affects the container size for visualization - it doesn't influence the radius calculations"
            />
          </div>

          {/* Calculations Display */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Live Calculations
            </h4>
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Inner Radius:</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{innerRadius}px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Padding:</span>
                <span className="text-gray-600 dark:text-gray-400 font-semibold">+ {padding}px</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 dark:border-gray-600 pt-1 mt-2">
                <span className="text-gray-600 dark:text-gray-400">Outer Radius:</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">{borderRadius}px</span>
              </div>
              <div className="text-[10px] text-gray-500 dark:text-gray-500 mt-2 italic">
                Formula: {innerRadius} + {padding} = {borderRadius}
              </div>
            </div>
          </div>

          {/* CSS Code Output */}
          <div className="p-3 bg-gray-900 dark:bg-gray-800 rounded-lg text-xs">
            <div className="text-gray-400 mb-1 font-semibold">Generated CSS:</div>
            <pre className="text-green-400 font-mono text-xs leading-tight">
{`.outer-container {
  width: ${dimension}px;
  height: ${dimension}px;
  border-radius: ${borderRadius}px; /* ${innerRadius}px + ${padding}px */
  padding: ${padding}px;
}

.inner-content {
  border-radius: ${innerRadius}px;
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 