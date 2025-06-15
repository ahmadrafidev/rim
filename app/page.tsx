'use client';

import { useState } from 'react';
import { RadiusDemo, ComparisonDemo, FloatingCalculatorPanel } from '@/components/radius-demo';
import { calculateOuterRadius } from '@/utils/radius';

export default function Home() {
  const [innerRadius, setInnerRadius] = useState(20);
  const [padding, setPadding] = useState(16);
  const [dimension, setDimension] = useState(200);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const borderRadius = calculateOuterRadius(innerRadius, padding);
  const maxPadding = Math.floor(dimension / 2) - 10; 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* First Section - Header and Live Preview */}
      <section className="min-h-screen flex flex-col justify-center py-8 px-4 relative">
        <div className="max-w-7xl mx-auto flex-1 flex flex-col justify-center">
          <header className="text-center mb-4">
            <h1 className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">
              Rim
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Fast and intuitive radius calculations
            </p>
          </header>

          {/* Live Preview */}
          <div className="flex items-center justify-center flex-1 min-h-[400px]">
            <RadiusDemo
              outerRadius={borderRadius}
              innerRadius={innerRadius}
              padding={padding}
              dimension={dimension}
            />
          </div>
        </div>

        {/* Scroll Indicator Cue */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Learn more about the math
          </p>
          <svg 
            className="w-6 h-6 text-gray-400 dark:text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </section>

      {/* Second Section - Understanding the Math */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Understanding the Math: Right vs Wrong
            </h2>
            
            {/* Comparison Demo */}
            <ComparisonDemo />

            {/* Right vs Wrong Explanation */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-2 border-red-200 dark:border-red-800">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    ✗
                  </div>
                  <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
                    Wrong Approach
                  </h3>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                  Using the same radius for both outer container and inner content creates 
                  visual inconsistency. The inner content appears to have sharper corners 
                  than intended.
                </p>
                <code className="bg-red-100 dark:bg-red-800 px-3 py-2 rounded text-xs font-mono block text-red-700 dark:text-red-300">
                  outer_radius = inner_radius = 20px
                </code>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-800">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    ✓
                  </div>
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                    Correct Approach
                  </h3>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                  Start with your desired inner content radius, then add padding. 
                  The outer radius adjusts automatically to maintain visual consistency.
                </p>
                <code className="bg-green-100 dark:bg-green-800 px-3 py-2 rounded text-xs font-mono block text-green-700 dark:text-green-300">
                  outer_radius = inner_radius + padding
                </code>
              </div>
            </div>

            {/* Formula and Details */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300 text-sm md:text-base">
                  The Formula
                </h3>
                <div className="space-y-2">
                  <code className="bg-blue-100 dark:bg-blue-800 px-3 py-2 rounded text-sm font-mono block">
                    outer_radius = inner_radius + padding
                  </code>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300 text-sm md:text-base">
                  Why It Matters
                </h3>
                <p className="text-sm text-justify">
                  Proper radius calculations ensure visual harmony between nested elements. 
                  Without this adjustment, designs look inconsistent and unprofessional.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-3 text-blue-700 dark:text-blue-300 text-sm md:text-base">
                  Common Use Cases
                </h3>
                <ul className="text-sm space-y-1 text-justify">
                  <li>• Card layouts</li>
                  <li>• Button corners</li>
                  <li>• Form input styling</li>
                  <li>• Modal dialogs</li>
                  <li>• Navigation bars</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Calculator Panel */}
      <FloatingCalculatorPanel
        borderRadius={borderRadius}
        innerRadius={innerRadius}
        setInnerRadius={setInnerRadius}
        padding={padding}
        setPadding={setPadding}
        dimension={dimension}
        setDimension={setDimension}
        maxPadding={maxPadding}
        isCollapsed={isPanelCollapsed}
        setIsCollapsed={setIsPanelCollapsed}
      />
    </div>
  );
}
