import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Floating Bubbles Animation
const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 30; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 30 + 10, // 10-40px for smaller section
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDuration: Math.random() * 8 + 6, // 6-14s
          opacity: Math.random() * 0.3 + 0.2, // 0.2-0.5
          delay: Math.random() * 3,
          direction: Math.random() > 0.5 ? 1 : -1,
          floatDistanceX: Math.random() * 80 + 40, // 40-120px
          floatDistanceY: Math.random() * 100 + 50, // 50-150px for footer
          color: [
            'from-cyan-500/50 to-blue-500/30',
            'from-purple-500/50 to-pink-500/30',
            'from-blue-600/50 to-indigo-500/30',
            'from-pink-500/50 to-red-500/30',
            'from-green-500/50 to-teal-500/30',
          ][i % 5],
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`absolute rounded-full bg-gradient-to-r ${bubble.color} 
                       shadow-[0_0_15px_rgba(34,211,238,0.3)] blur-sm`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              opacity: bubble.opacity,
              animation: `floatBubble ${bubble.animationDuration}s infinite ease-in-out`,
              animationDelay: `${bubble.delay}s`,
              '--float-x': `${bubble.direction * bubble.floatDistanceX}px`,
              '--float-y': `${bubble.floatDistanceY}px`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes floatBubble {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(calc(0.5 * var(--float-x)), calc(-0.3 * var(--float-y))) scale(1.1);
          }
          50% {
            transform: translate(calc(-0.5 * var(--float-x)), calc(-0.6 * var(--float-y))) scale(0.9);
          }
          75% {
            transform: translate(calc(0.3 * var(--float-x)), calc(-0.9 * var(--float-y))) scale(1.05);
          }
        }
      `}</style>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 sm:px-6 md:px-12 min-h-[200px] bg-white/5 backdrop-blur-xl border-t border-cyan-400/20 overflow-visible">
      <FloatingBubbles />
      <motion.div
        className="text-center max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-sm sm:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(236, 72, 153, 0.6)' }}
          style={{ backgroundSize: '200% 200%' }}
        >
          © 2025 Faizan Ahmed. All Rights Reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;