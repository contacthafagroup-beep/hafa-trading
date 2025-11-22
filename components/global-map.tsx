'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Country {
  name: string;
  flag: string;
  x: number; // percentage position
  y: number; // percentage position
}

// Accurate positions based on equirectangular projection
// Longitude: -180 to 180 mapped to 0% to 100%
// Latitude: 90 to -90 mapped to 0% to 100%
// With 1.2x zoom and 45% vertical center adjustment

// Ethiopia: ~40°E, ~9°N
const ethiopia = { x: 55.5, y: 56 };

const countries: Country[] = [
  // UAE: ~54°E, ~24°N
  { name: 'UAE', flag: '🇦🇪', x: 59.5, y: 52 },
  
  // Saudi Arabia: ~45°E, ~24°N  
  { name: 'Saudi Arabia', flag: '🇸🇦', x: 56.5, y: 52 },
  
  // Russia (Moscow): ~37°E, ~55°N
  { name: 'Russia', flag: '🇷🇺', x: 54.5, y: 38 },
  
  // China (Beijing): ~116°E, ~40°N
  { name: 'China', flag: '🇨🇳', x: 73, y: 48 },
  
  // Turkey (Ankara): ~33°E, ~39°N
  { name: 'Turkey', flag: '🇹🇷', x: 53.5, y: 49 },
  
  // EU (Germany): ~10°E, ~51°N
  { name: 'EU', flag: '🇪🇺', x: 47.5, y: 42 },
  
  // USA (New York): ~-74°E, ~40°N
  { name: 'USA', flag: '🇺🇸', x: 20.5, y: 48 },
  
  // India (Delhi): ~77°E, ~28°N
  { name: 'India', flag: '🇮🇳', x: 65, y: 51 }
];

export default function GlobalMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-[#0a1628] rounded-3xl overflow-hidden border-2 border-blue-700/50 shadow-2xl">
      {/* Actual World Map Image - Much Clearer and Zoomed */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
          alt="World Map"
          className="w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.5) contrast(1.3) saturate(0.3) hue-rotate(200deg)',
            opacity: 0.7,
            transform: 'scale(1.2)',
            objectPosition: 'center 45%'
          }}
        />
        {/* Subtle dark blue overlay - less intense */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-blue-900/30 to-blue-950/40"></div>
      </div>
      
      {/* Subtle grid overlay for tech feel */}
      <div className="absolute inset-0 opacity-5 z-[1]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(96, 165, 250, 0.6)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Connection Lines from Ethiopia to each country */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          {/* Gradient for neon lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {countries.map((country, index) => {
          const isHovered = hoveredCountry === country.name;
          return (
            <motion.g key={country.name}>
              {/* Curved connection line */}
              <motion.path
                d={`M ${ethiopia.x}% ${ethiopia.y}% Q ${(ethiopia.x + country.x) / 2}% ${Math.min(ethiopia.y, country.y) - 10}% ${country.x}% ${country.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth={isHovered ? "3" : "2"}
                fill="none"
                strokeDasharray="10 5"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: isHovered ? 1 : 0.6,
                  strokeWidth: isHovered ? 3 : 2
                }}
                transition={{ 
                  duration: 2, 
                  delay: index * 0.2,
                  pathLength: { duration: 2, ease: "easeInOut" }
                }}
              />
              
              {/* Animated dot traveling along the line */}
              <motion.circle
                r="4"
                fill="#10b981"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  offsetDistance: ['0%', '100%']
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${index * 0.3}s`}
                >
                  <mpath href={`#path-${index}`} />
                </animateMotion>
              </motion.circle>
              
              {/* Hidden path for animation */}
              <path
                id={`path-${index}`}
                d={`M ${ethiopia.x}% ${ethiopia.y}% Q ${(ethiopia.x + country.x) / 2}% ${Math.min(ethiopia.y, country.y) - 10}% ${country.x}% ${country.y}%`}
                fill="none"
                stroke="none"
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Ethiopia - Center Point with Pulsing Glow and Location Marker */}
      <motion.div
        className="absolute z-20"
        style={{ left: `${ethiopia.x}%`, top: `${ethiopia.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        {/* Location Crosshair - Shows exact position on map */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute z-0"
          style={{ width: '100px', height: '100px', left: '-50px', top: '-50px' }}
        >
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-green-400"></div>
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-green-400"></div>
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
        </motion.div>
        
        {/* Pulsing rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-green-400"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ 
              scale: [1, 2.5, 3],
              opacity: [0.8, 0.3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut"
            }}
            style={{ width: '60px', height: '60px', left: '-30px', top: '-30px' }}
          />
        ))}
        
        {/* Ethiopia pin */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl border-4 border-white"
        >
          <span className="text-3xl">🇪🇹</span>
        </motion.div>
        
        {/* Ethiopia label with coordinates hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇪🇹</span>
              <div>
                <div>Ethiopia</div>
                <div className="text-xs opacity-80">Horn of Africa</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Country Pins */}
      {countries.map((country, index) => (
        <motion.div
          key={country.name}
          className="absolute cursor-pointer z-20"
          style={{ left: `${country.x}%`, top: `${country.y}%`, transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
          onHoverStart={() => setHoveredCountry(country.name)}
          onHoverEnd={() => setHoveredCountry(null)}
        >
          {/* Pulsing light effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400/50 blur-xl"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
            style={{ width: '40px', height: '40px', left: '-20px', top: '-20px' }}
          />
          
          {/* Arrow pointing to destination */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 1.5 }}
            className="absolute z-0"
            style={{ 
              width: '60px', 
              height: '60px', 
              left: '-30px', 
              top: '-30px',
              pointerEvents: 'none'
            }}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <defs>
                <marker
                  id={`arrowhead-${index}`}
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 5, 0 10" fill="#60a5fa" />
                </marker>
              </defs>
              <circle cx="30" cy="30" r="28" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
            </svg>
          </motion.div>
          
          {/* Country pin */}
          <motion.div
            whileHover={{ scale: 1.3, y: -5 }}
            className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-xl border-2 border-white"
          >
            <span className="text-2xl">{country.flag}</span>
          </motion.div>
          
          {/* Country name tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ 
              opacity: hoveredCountry === country.name ? 1 : 0,
              y: hoveredCountry === country.name ? 0 : 10,
              scale: hoveredCountry === country.name ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none"
          >
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {country.flag} {country.name}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Decorative stars/sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full z-5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
}
