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
      for (let i = 0; i < 8; i++) { // Further reduced to 8 bubbles
        newBubbles.push({
          id: i,
          size: Math.random() * 25 + 10, // Smaller bubbles: 10-35px
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDuration: Math.random() * 10 + 6, // Shorter duration: 6-16s
          opacity: Math.random() * 0.3 + 0.2, // 0.2-0.5
          delay: Math.random() * 3,
          direction: Math.random() > 0.5 ? 1 : -1,
          floatDistanceX: Math.random() * 60 + 30, // Smaller range: 30-90px
          floatDistanceY: Math.random() * 120 + 80, // Smaller range: 80-200px
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
                       shadow-[0_0_10px_rgba(34,211,238,0.2)] will-change-transform`}
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
          50% {
            transform: translate(var(--float-x), calc(-0.5 * var(--float-y))) scale(0.95);
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
        delay: index * 0.06, // Reduced delay for faster load
        duration: 0.5, // Shorter duration
        ease: "easeOut",
      }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHoveredSkill(skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <motion.div
        className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl border border-white/20 rounded-xl p-3 sm:p-4 lg:p-6 h-full overflow-hidden shadow-md sm:shadow-lg"
        whileHover={{
          y: -5, // Reduced hover lift
          scale: 1.03, // Smaller scale
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(45deg, ${skill.color.split(' ')[1]}, ${skill.color.split(' ')[3]})`,
            opacity: 0,
          }}
          animate={{
            opacity: hoveredSkill === skill.name ? 0.2 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
        
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-lg flex items-center justify-center overflow-hidden border border-white/10"
          animate={{
            scale: hoveredSkill === skill.name ? 1.1 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain p-1"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/64?text=' + skill.name; // Fallback image
            }}
          />
        </motion.div>

        <motion.h3
          className="text-base sm:text-lg lg:text-xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          animate={{
            scale: hoveredSkill === skill.name ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {skill.name}
        </motion.h3>

        <motion.p
          className="text-gray-300 text-center mb-3 sm:mb-4 font-medium text-xs sm:text-sm"
          animate={{
            color: hoveredSkill === skill.name ? '#22d3ee' : '#d1d5db',
          }}
          transition={{ duration: 0.2 }}
        >
          {skill.experience}
        </motion.p>

        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 font-semibold">Proficiency</span>
            <motion.span 
              className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                scale: hoveredSkill === skill.name ? 1.1 : 1,
              }}
            >
              {skill.level}%
            </motion.span>
          </div>
          
          <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{
                delay: index * 0.08 + 0.6,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
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
              {[...Array(2)].map((_, i) => ( // Reduced to 2 sparkles
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                  }}
                  animate={{ 
                    opacity: [0, 0.8, 0], 
                    scale: [0, 0.8, 0],
                    y: -50,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
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
    <section id="skills" className="relative py-6 px-2 sm:px-4 md:px-8 lg:px-12 min-h-[600px] overflow-visible">
      <FloatingBubbles />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-3 sm:mb-4 tracking-tight"
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
            Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Crafting digital experiences with modern technologies and creative problem-solving
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'text-white shadow-md shadow-cyan-500/30'
                  : 'text-gray-300 hover:text-white backdrop-blur-sm border border-white/20'
              }`}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: '0 8px 16px rgba(34, 211, 238, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
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
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 sm:mt-12 lg:mt-16 text-center"
        >
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 sm:mb-8"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            My Development Journey
          </motion.h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                className="relative group"
                whileHover={{ scale: 1.03, y: -3 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-lg p-3 sm:p-4 border border-white/20 shadow-md sm:shadow-lg"
                  whileHover={{
                    boxShadow: '0 8px 16px rgba(34, 211, 238, 0.2)',
                  }}
                >
                  <motion.div
                    className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-1"
                    animate={{ 
                      scale: [1, 1.03, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <motion.div
                    className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1"
                    animate={{ 
                      scale: [1, 1.03, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {stat.text}
                  </motion.div>
                  <p className="text-gray-300 font-semibold text-xs sm:text-sm md:text-base">{stat.label}</p>
                </motion.div>
                
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-80 blur transition-opacity duration-300 -z-10"
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