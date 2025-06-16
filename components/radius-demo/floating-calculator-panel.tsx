import { useState, memo, useId } from 'react';
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const panelId = useId();
  const contentId = useId();

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
      className="fixed bottom-4 left-4 right-4 md:top-6 md:left-6 md:right-auto md:bottom-auto z-50 w-auto md:w-96 
                 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50
                 transition-all duration-300 ease-out hover:shadow-3xl max-h-[calc(100vh-2rem)] overflow-hidden"
      role="region"
      aria-labelledby={panelId}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-100 dark:border-gray-800/50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
            <Calculator size={14} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 
              id={panelId}
              className="text-sm md:text-base font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            >
              Radius Calculator
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Interactive border radius tool
            </p>
          </div>
        </div>
        
        <button
          onClick={toggleCollapsed}
          aria-expanded={!isCollapsed}
          aria-controls={contentId}
          aria-label={isCollapsed ? 'Expand calculator panel' : 'Collapse calculator panel'}
          className="flex items-center justify-center w-7 h-7 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 
                     transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-100 dark:focus:bg-gray-800/50
                     active:scale-95"
          type="button"
        >
          <div className={`transition-transform duration-150 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
            <ChevronDown size={14} aria-hidden="true" />
          </div>
        </button>
      </div>

      {/* Content */}
      <div 
        id={contentId}
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isCollapsed 
            ? 'max-h-0 opacity-0' 
            : 'max-h-[calc(100vh-8rem)] opacity-100'
        }`}
        aria-hidden={isCollapsed}
      >
        <div className="p-3 md:p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {/* Controls Section */}
          <fieldset className="space-y-3">
            <legend className="sr-only">Radius calculation controls</legend>
            
            <div className="space-y-3">
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
          </fieldset>

          {/* Live Calculations */}
          <section 
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/30 dark:border-blue-800/30"
            aria-labelledby="calculations-heading"
          >
            <div className="p-3">
              <h4 
                id="calculations-heading"
                className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                Live Calculations
              </h4>
              
              <div className="space-y-1.5" role="table" aria-label="Calculation results">
                <div className="flex justify-between items-center py-1" role="row">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium" role="rowheader">
                    Inner Radius
                  </span>
                  <span 
                    className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md text-sm font-bold font-mono" 
                    role="cell"
                    aria-label={`${innerRadius} pixels`}
                  >
                    {innerRadius}px
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-1" role="row">
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium" role="rowheader">
                    Padding
                  </span>
                  <span 
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-bold font-mono" 
                    role="cell"
                    aria-label={`Plus ${padding} pixels`}
                  >
                    + {padding}px
                  </span>
                </div>
                
                <div className="border-t border-blue-200 dark:border-blue-800 pt-1.5 mt-2">
                  <div className="flex justify-between items-center py-1" role="row">
                    <span className="text-sm text-gray-900 dark:text-white font-bold" role="rowheader">
                      Outer Radius
                    </span>
                    <span 
                      className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-bold font-mono shadow-lg" 
                      role="cell"
                      aria-label={`${borderRadius} pixels total`}
                    >
                      {borderRadius}px
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <span className="font-mono">
                    Formula: <span className="text-blue-600 dark:text-blue-400">{innerRadius}</span> + <span className="text-gray-600 dark:text-gray-400">{padding}</span> = <span className="text-green-600 dark:text-green-400 font-bold">{borderRadius}</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* CSS Code Output */}
          <section 
            className="relative overflow-hidden rounded-xl bg-gray-900 dark:bg-gray-950"
            aria-labelledby="css-heading"
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-700">
              <h4 
                id="css-heading"
                className="text-sm font-bold text-gray-200 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Generated CSS
              </h4>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-300 hover:text-white
                           bg-gray-800 hover:bg-gray-700 rounded-md transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-95"
                aria-label="Copy CSS code to clipboard"
              >
                {isCopied ? (
                  <>
                    <Check size={11} className="text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="p-3">
              <pre 
                className="text-xs font-mono leading-relaxed overflow-x-auto text-gray-300"
                role="code"
                aria-label="Generated CSS code"
                tabIndex={0}
              >
                <code className="text-gray-300">
{`.outer-container {`}
                  <br />
                  <span className="text-blue-400">  width</span><span className="text-gray-400">:</span> <span className="text-green-400">{dimension}px</span><span className="text-gray-400">;</span>
                  <br />
                  <span className="text-blue-400">  height</span><span className="text-gray-400">:</span> <span className="text-green-400">{dimension}px</span><span className="text-gray-400">;</span>
                  <br />
                  <span className="text-blue-400">  border-radius</span><span className="text-gray-400">:</span> <span className="text-green-400">{borderRadius}px</span><span className="text-gray-500">; /* {innerRadius}px + {padding}px */</span>
                  <br />
                  <span className="text-blue-400">  padding</span><span className="text-gray-400">:</span> <span className="text-green-400">{padding}px</span><span className="text-gray-400">;</span>
                  <br />
{`}`}
                  <br />
                  <br />
{`.inner-content {`}
                  <br />
                  <span className="text-blue-400">  border-radius</span><span className="text-gray-400">:</span> <span className="text-green-400">{innerRadius}px</span><span className="text-gray-400">;</span>
                  <br />
{`}`}
                </code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}); 