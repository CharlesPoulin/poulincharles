// src/components/sections/MLVisualization.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Using a simple fallback component
const FallbackVisualization = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-accent-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
      <p className="mt-4 text-center">Visualization unavailable</p>
    </div>
  </div>
);

// Create a simplified visualization component that doesn't rely on Three.js
// This will prevent the SSR issues with React Three Fiber
function SimplifiedNeuralNetwork() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative h-4/5 w-4/5">
        {/* Static SVG visualization that looks like a neural network */}
        <svg viewBox="0 0 800 600" className="w-full h-full">
          {/* Background gradient */}
          <defs>
            <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          
          <rect x="0" y="0" width="800" height="600" fill="url(#bg-gradient)" rx="20" ry="20" />
          
          {/* Layer 1 nodes */}
          <circle cx="150" cy="150" r="20" fill="url(#node-gradient)" />
          <circle cx="150" cy="250" r="20" fill="url(#node-gradient)" />
          <circle cx="150" cy="350" r="20" fill="url(#node-gradient)" />
          <circle cx="150" cy="450" r="20" fill="url(#node-gradient)" />
          
          {/* Layer 2 nodes */}
          <circle cx="350" cy="120" r="20" fill="url(#node-gradient)" />
          <circle cx="350" cy="220" r="20" fill="url(#node-gradient)" />
          <circle cx="350" cy="320" r="20" fill="url(#node-gradient)" />
          <circle cx="350" cy="420" r="20" fill="url(#node-gradient)" />
          <circle cx="350" cy="480" r="20" fill="url(#node-gradient)" />
          
          {/* Layer 3 nodes */}
          <circle cx="550" cy="200" r="20" fill="url(#node-gradient)" />
          <circle cx="550" cy="300" r="20" fill="url(#node-gradient)" />
          <circle cx="550" cy="400" r="20" fill="url(#node-gradient)" />
          
          {/* Layer 4 nodes */}
          <circle cx="700" cy="300" r="20" fill="url(#node-gradient)" />
          
          {/* Connections between Layer 1 and Layer 2 */}
          {[150, 250, 350, 450].map(y1 => 
            [120, 220, 320, 420, 480].map(y2 => (
              <line 
                key={`${y1}-${y2}`}
                x1="150" 
                y1={y1}
                x2="350" 
                y2={y2}
                stroke="#93c5fd"
                strokeWidth="2"
                strokeOpacity="0.6"
              />
            ))
          )}
          
          {/* Connections between Layer 2 and Layer 3 */}
          {[120, 220, 320, 420, 480].map(y1 => 
            [200, 300, 400].map(y2 => (
              <line 
                key={`${y1}-${y2}`}
                x1="350" 
                y1={y1}
                x2="550" 
                y2={y2}
                stroke="#93c5fd"
                strokeWidth="2"
                strokeOpacity="0.6"
              />
            ))
          )}
          
          {/* Connections between Layer 3 and Layer 4 */}
          {[200, 300, 400].map(y1 => (
            <line 
              key={y1}
              x1="550" 
              y1={y1}
              x2="700" 
              y2="300"
              stroke="#93c5fd"
              strokeWidth="2"
              strokeOpacity="0.6"
            />
          ))}
          
          {/* Floating data points */}
          {Array.from({ length: 30 }, (_, i) => {
            const x = 100 + Math.random() * 600;
            const y = 100 + Math.random() * 400;
            const size = 5 + Math.random() * 8;
            return (
              <circle 
                key={`data-${i}`}
                cx={x} 
                cy={y} 
                r={size} 
                fill="#60a5fa"
                opacity="0.6"
              >
                <animate
                  attributeName="cy"
                  values={`${y};${y-10};${y}`}
                  dur={`${2 + Math.random() * 3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.8;0.6"
                  dur={`${1 + Math.random() * 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function MLVisualization() {
  // Using hydration to ensure client-side only rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return placeholder while React hydrates the component
  if (!isMounted) {
    return (
      <div className="h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="flex items-center justify-center h-full">
          <div className="text-accent-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <p className="mt-4 text-center">Loading visualization...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50">
      <SimplifiedNeuralNetwork />
    </div>
  );
}