'use client';

import { useState, memo, useCallback, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { RadiusDemo, ComparisonDemo } from '@/components/radius-demo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Footer } from '@/components/footer';
import { calculateOuterRadius } from '@/utils/radius';

const FloatingCalculatorPanel = dynamic(
  () => import('@/components/radius-demo').then(mod => ({ 
    default: mod.FloatingCalculatorPanel 
  })),
  { 
    loading: () => (
      <div className="fixed top-8 left-8 z-50 w-80">
        <div className="w-full px-4 py-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-300/50 dark:border-gray-600/50 rounded-lg shadow-sm animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false 
  }
);

const Home = memo(function Home() {
  const [innerRadius, setInnerRadius] = useState(20);
  const [padding, setPadding] = useState(16);
  const [dimension, setDimension] = useState(250);

  const borderRadius = useMemo(() => calculateOuterRadius(innerRadius, padding), [innerRadius, padding]);
  const maxPadding = useMemo(() => Math.max(0, Math.floor((dimension - 20) / 2)), [dimension]);

  useEffect(() => {
    if (padding > maxPadding) {
      setPadding(Math.max(0, maxPadding));
    } 
  }, [maxPadding, padding]); 

  const handleInnerRadiusChange = useCallback((value: number) => {
    setInnerRadius(value);
  }, []);

  const handlePaddingChange = useCallback((value: number) => {
    setPadding(value); 
  }, []);

  const handleDimensionChange = useCallback((value: number) => {
    setDimension(value);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-40">
        <ThemeToggle />
      </div>

      <section className="min-h-screen flex flex-col justify-center py-8 px-4 relative">
        <div className="max-w-7xl mx-auto flex-1 flex flex-col justify-center">
          <header className="text-center mb-4">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Rim
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Fast and intuitive radius calculations
            </p>
          </header>

          {/* Live Preview */}
          <main id="main-content" className="flex items-center justify-center flex-1 min-h-[400px]">
            <RadiusDemo
              outerRadius={borderRadius}
              innerRadius={innerRadius}
              padding={padding}
              dimension={dimension}
            />
          </main>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <button
            onClick={() => document.querySelector('#understanding-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center animate-bounce focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-950 rounded-lg p-2 group"
            aria-label="Scroll down to learn more about the radius calculation math"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              Learn more about the math
            </span>
            <svg
              className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Second Section - Understanding the Math */}
      <section className="py-16 px-4" aria-labelledby="understanding-section">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-6xl mx-auto border border-gray-300 dark:border-zinc-700 shadow-xl shadow-gray-900/10 dark:shadow-zinc/30">
            <h2
              id="understanding-section"
              className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center"
            >
              Understanding the Math: Right vs Wrong
            </h2>

            {/* Comparison Demo */}
            <div className="sr-only">
              <h3 id="comparison-title">Visual Comparison of Radius Calculation Approaches</h3>
            </div>
            <ComparisonDemo />

            {/* Right vs Wrong Explanation */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-2 border-red-200 dark:border-red-800">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3" aria-hidden="true">
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
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3" aria-hidden="true">
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
                <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-300 text-sm md:text-base">
                  The Formula
                </h3>
                <div className="space-y-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded text-sm font-mono block">
                    outer_radius = inner_radius + padding
                  </code>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-300 text-sm md:text-base">
                  Why It Matters
                </h3>
                <p className="text-sm text-justify">
                  Proper radius calculations ensure visual harmony between nested elements. 
                  Without this adjustment, designs look inconsistent and unprofessional.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-300 text-sm md:text-base">
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
        setInnerRadius={handleInnerRadiusChange}
        padding={padding}
        setPadding={handlePaddingChange}
        dimension={dimension}
        setDimension={handleDimensionChange}
        maxPadding={maxPadding}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
});

export default Home;
