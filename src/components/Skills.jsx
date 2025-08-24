import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import htmlLogo from "../assets/html.png";
import cssLogo from "../assets/css.png";
import jsLogo from "../assets/javascript.png";
import tsLogo from "../assets/typescript.png";
import bootstrapLogo from "../assets/bootstrap.png";
import tailwindLogo from "../assets/tailwindcss.png";
import reactLogo from "../assets/react.png";
import nextLogo from "../assets/nextjs.png";
import nodeLogo from "../assets/nodejs.png";
import expressLogo from "../assets/express.png";
import mongoLogo from "../assets/mongodb.png";
import cLogo from "../assets/c.png";
import cppLogo from "../assets/cpp.png";
import pythonLogo from "../assets/python.jpg";

// Floating Bubbles Animation
const FloatingBubbles = React.memo(() => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 10; i++) { // Reduced to 10 bubbles
        newBubbles.push({
          id: i,
          size: Math.random() * 30 + 10,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDuration: Math.random() * 12 + 8,
          opacity: Math.random() * 0.4 + 0.2,
          delay: Math.random() * 5,
          direction: Math.random() > 0.5 ? 1 : -1,
          floatDistanceX: Math.random() * 80 + 40,
          floatDistanceY: Math.random() * 150 + 100,
          color: [
            'from-cyan-400/40 to-blue-400/40',
            'from-purple-400/40 to-pink-400/40',
            'from-blue-500/40 to-indigo-400/40',
            'from-pink-400/40 to-red-400/40',
          ][i % 4],
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
                       shadow-[0_0_15px_rgba(34,211,238,0.3)] will-change-transform`}
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
});

const SkillItem = React.memo(({ skill, index, hoveredSkill, setHoveredSkill }) => {
  return (
    <motion.div
      key={skill.name}
      layout
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        type: "spring",
        stiffness: 100, 
      }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 h-full overflow-hidden shadow-xl sm:shadow-2xl"
        whileHover={{
          y: -10,
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        }}
        transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl"
          style={{
            background: `linear-gradient(45deg, ${skill.color.split(' ')[1]}, ${skill.color.split(' ')[3]})`,
            opacity: 0,
          }}
          animate={{
            opacity: hoveredSkill === skill.name ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden border border-white/10"
          animate={{
            scale: hoveredSkill === skill.name ? 1.2 : 1,
          }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain p-1 sm:p-2"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            loading="lazy" // Lazy-load images
          />
        </motion.div>

        <motion.h3
          className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          animate={{
            scale: hoveredSkill === skill.name ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {skill.name}
        </motion.h3>

        <motion.p
          className="text-gray-300 text-center mb-4 sm:mb-6 font-medium text-sm sm:text-base"
          animate={{
            color: hoveredSkill === skill.name ? '#22d3ee' : '#d1d5db',
          }}
          transition={{ duration: 0.3 }}
        >
          {skill.experience}
        </motion.p>

        <div className="relative">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs sm:text-sm text-gray-400 font-semibold">Proficiency</span>
            <motion.span 
              className="text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                scale: hoveredSkill === skill.name ? 1.2 : 1,
              }}
            >
              {skill.level}%
            </motion.span>
          </div>
          
          <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{
                delay: index * 0.1 + 0.8,
                duration: 1.2,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {hoveredSkill === skill.name && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: Math.random() * 150 - 75,
                    y: Math.random() * 150 - 75,
                  }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    y: -80,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skills = [
    { name: 'HTML', category: 'frontend', level: 90, color: 'from-orange-500 to-red-500', icon: htmlLogo, experience: '1+ years' },
    { name: 'CSS', category: 'frontend', level: 82, color: 'from-blue-500 to-indigo-600', icon: cssLogo, experience: '1+ years' },
    { name: 'JavaScript', category: 'frontend', level: 73, color: 'from-yellow-400 to-yellow-600', icon: jsLogo, experience: '1+ years' },
    { name: 'TypeScript', category: 'frontend', level: 72, color: 'from-blue-600 to-blue-800', icon: tsLogo, experience: '1+ year' },
    { name: 'Bootstrap', category: 'frontend', level: 88, color: 'from-purple-600 to-indigo-600', icon: bootstrapLogo, experience: '1+ years' },
    { name: 'Tailwind CSS', category: 'frontend', level: 86, color: 'from-cyan-400 to-blue-500', icon: tailwindLogo, experience: '1+ years' },
    { name: 'React.js', category: 'frontend', level: 78, color: 'from-cyan-400 to-blue-600', icon: reactLogo, experience: '1+ years' },
    { name: 'Next.js', category: 'frontend', level: 75, color: 'from-gray-800 to-black', icon: nextLogo, experience: '1+ year' },
    { name: 'Node.js', category: 'backend', level: 74, color: 'from-green-500 to-green-700', icon: nodeLogo, experience: '1+ years' },
    { name: 'Express.js', category: 'backend', level: 74, color: 'from-gray-600 to-gray-800', icon: expressLogo, experience: '1+ years' },
    { name: 'MongoDB', category: 'database', level: 80, color: 'from-green-600 to-green-800', icon: mongoLogo, experience: '1+ years' },
    { name: 'C', category: 'programming', level: 65, color: 'from-blue-700 to-blue-900', icon: cLogo, experience: '1+ years' },
    { name: 'C++', category: 'programming', level: 68, color: 'from-blue-800 to-indigo-900', icon: cppLogo, experience: '1+ years' },
    { name: 'Python', category: 'programming', level: 72, color: 'from-yellow-500 to-blue-600', icon: pythonLogo, experience: '3 months' },
  ];

  // Categories without icons
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'programming', name: 'Programming' },
  ];

  const filteredSkills = useMemo(() => {
    return selectedCategory === 'all'
      ? skills
      : skills.filter(skill => skill.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="relative py-8 px-4 sm:px-6 md:px-12 min-h-screen overflow-hidden">
      <FloatingBubbles />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.h2
            className="text-4xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-4 sm:mb-6 tracking-tight"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Skills
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative inline-block"
          >
            <motion.p
              className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
              animate={{
                textShadow: [
                  '0 0 8px rgba(34, 211, 238, 0.5)',
                  '0 0 16px rgba(34, 211, 238, 0.3)',
                  '0 0 8px rgba(34, 211, 238, 0.5)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Crafting digital experiences with modern technologies and creative problem-solving
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-sm sm:text-lg transition-all duration-500 overflow-hidden ${
                selectedCategory === category.id
                  ? 'text-white shadow-2xl shadow-cyan-500/50'
                  : 'text-gray-300 hover:text-white backdrop-blur-sm border border-white/20'
              }`}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: '0 15px 30px rgba(34, 211, 238, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center">
                {category.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="sync">
            {filteredSkills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                skill={skill}
                index={index}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 sm:mt-16 lg:mt-24 text-center"
        >
          <motion.h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 sm:mb-12"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            My Development Journey
          </motion.h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { label: 'Technologies', value: skills.length, suffix: '+', text: 'Tech' },
              { label: 'Years Experience', value: '1', suffix: '+', text: 'Years' },
              { label: 'Projects Completed', value: '30', suffix: '+', text: 'Projects' },
              { label: 'Lines of Code', value: '100K', suffix: '+', text: 'Code' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 + index * 0.15, duration: 0.8 }}
                className="relative group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl sm:shadow-2xl"
                  whileHover={{
                    boxShadow: '0 15px 30px rgba(34, 211, 238, 0.3)',
                  }}
                >
                  <motion.div
                    className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-1 sm:mb-2"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      textShadow: [
                        '0 0 15px rgba(34, 211, 238, 0.5)',
                        '0 0 25px rgba(34, 211, 238, 0.8)',
                        '0 0 15px rgba(34, 211, 238, 0.5)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <motion.div
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1 sm:mb-2"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {stat.text}
                  </motion.div>
                  <p className="text-gray-300 font-semibold text-sm sm:text-base md:text-lg">{stat.label}</p>
                </motion.div>
                
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;