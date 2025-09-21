import { useState, memo, useId, useEffect, useRef } from 'react';
import { ChevronDown, Calculator, Copy, Check } from 'lucide-react';

import { Slider } from '@/components/ui/slider';
import type { FloatingCalculatorPanelProps } from '@/types';

export const FloatingCalculatorPanel = memo(function FloatingCalculatorPanel({
  borderRadius,
  innerRadius,
  setInnerRadius,
  padding,
  setPadding,
  dimension,
  setDimension,
  maxPadding
}: FloatingCalculatorPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const panelId = useId();
  const contentId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Focus management and keyboard handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isCollapsed) {
        setIsCollapsed(true);
        triggerRef.current?.focus();
      }
    };

    if (!isCollapsed) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isCollapsed]);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const copyToClipboard = async () => {
    const cssCode = `.outer-container {
  width: ${dimension}px;
  height: ${dimension}px;
  border-radius: ${borderRadius}px; /* ${innerRadius}px + ${padding}px */
  padding: ${padding}px;
}

.inner-content {
  border-radius: ${innerRadius}px;
}`;

    try {
      await navigator.clipboard.writeText(cssCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS:', err);
    }
  };

  return (
    <div
      ref={panelRef}
      className="fixed top-8 left-8 z-50 w-80"
      role="region"
      aria-labelledby={panelId}
    >
      {/* Dropdown Trigger */}
      <button
        ref={triggerRef}
        onClick={toggleCollapsed}
        aria-expanded={!isCollapsed}
        aria-controls={contentId}
        className="
          w-full flex items-center justify-between px-4 py-3 
          bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-600
          rounded-lg shadow-sm
          hover:bg-gray-50 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500
          transition-colors duration-200"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-gray-700 dark:bg-gray-600 rounded text-white" aria-hidden="true">
            <Calculator size={14} aria-hidden="true" />
          </div>
          <span 
            id={panelId}
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Radius Calculator
          </span>
        </div>
        
        <div className={`transition-transform duration-200 ${
          isCollapsed ? 'rotate-0' : 'rotate-180'
        }`}>
          <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" aria-hidden="true" />
        </div>
      </button>

      {/* Dropdown Content */}
      <div 
        id={contentId}
        className={`mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
          isCollapsed 
            ? 'max-h-0 opacity-0 overflow-hidden' 
            : 'max-h-[600px] opacity-100 overflow-hidden'
        }`}
        aria-hidden={isCollapsed}
      >
        <div className="p-4 space-y-4 overflow-y-auto max-h-[600px]">
          
          {/* Controls Section */}
          <div className="space-y-4">
            <Slider
              label="Inner Radius"
              value={innerRadius}
              min={0}
              max={50}
              onChange={setInnerRadius}
              note="Set your desired inner content radius"
            />
            
            <Slider
              label="Padding"
              value={padding}
              min={0}
              max={maxPadding}
              onChange={setPadding}
              note="Spacing between outer and inner elements"
            />
            
            <Slider
              label="Container Size"
              value={dimension}
              min={100}
              max={400}
              onChange={setDimension}
              note="Preview container dimensions (visual only)"
            />
          </div>

          {/* Live Calculations */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Live Calculations
            </h4>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">Inner Radius</span>
                <span className="font-mono text-gray-900 dark:text-gray-100">{innerRadius}px</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">Padding</span>
                <span className="font-mono text-gray-900 dark:text-gray-100">+ {padding}px</span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-900 dark:text-gray-100">Outer Radius</span>
                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{borderRadius}px</span>
                </div>
              </div>
            </div>
          </div>

          {/* CSS Code Output */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Generated CSS
              </h4>
              <button
                onClick={copyToClipboard}
                className="
                flex items-center gap-1.5 px-2 py-1 text-xs font-medium
                text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100
                bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500
                rounded border border-gray-300 dark:border-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                transition-colors duration-200"
                aria-label={`Copy CSS code to clipboard${isCopied ? ' - Copied!' : ''}`}
                type="button"
              >
                {isCopied ? (
                  <Check size={12} className="text-green-600 dark:text-green-400" />
                ) : (
                  <Copy size={12} />
                )}
                <span className={isCopied ? 'text-green-600 dark:text-green-400' : ''}>
                  {isCopied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
            
            <div className="p-3 bg-gray-900 dark:bg-gray-800">
              <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-gray-300 dark:text-gray-200">
                <code>
{`.outer-container {`}
                  <br />
                  <span className="text-purple-300 dark:text-purple-400">  width</span><span className="text-gray-400">:</span> <span className="text-green-300">{dimension}px</span><span className="text-gray-400">;</span>
                  <br />
                  <span className="text-purple-300 dark:text-purple-400">  height</span><span className="text-gray-400">:</span> <span className="text-green-300">{dimension}px</span><span className="text-gray-400">;</span>
                  <br />
                  <span className="text-purple-300 dark:text-purple-400">  border-radius</span><span className="text-gray-400">:</span> <span className="text-green-300">{borderRadius}px</span><span className="text-gray-500">; /* {innerRadius}px + {padding}px */</span>
                  <br />
                  <span className="text-purple-300 dark:text-purple-400">  padding</span><span className="text-gray-400">:</span> <span className="text-green-300">{padding}px</span><span className="text-gray-400">;</span>
                  <br />
{`}`}
                  <br />
                  <br />
{`.inner-content {`}
                  <br />
                  <span className="text-purple-300 dark:text-purple-400">  border-radius</span><span className="text-gray-400">:</span> <span className="text-green-300">{innerRadius}px</span><span className="text-gray-400">;</span>
                  <br />
{`}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}); 

FloatingCalculatorPanel.displayName = 'FloatingCalculatorPanel';
