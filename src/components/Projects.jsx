import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Floating Bubbles Animation
const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 30; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 40 + 15, // 15-55px
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDuration: Math.random() * 10 + 8, // 8-18s
          opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
          delay: Math.random() * 4,
          direction: Math.random() > 0.5 ? 1 : -1,
          floatDistanceX: Math.random() * 100 + 50, // 50-150px
          floatDistanceY: Math.random() * 400 + 200, // 200-600px
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
                       shadow-[0_0_20px_rgba(34,211,238,0.4)] blur-sm`}
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

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [clickedProject, setClickedProject] = useState(null);

  const projects = [
    {
      title: 'Blog App',
      description: 'A full-stack blogging platform with user authentication. Users can read and comment on blogs, while admins can create, update, delete blogs, manage categories, tags, user permissions, and moderate comments.',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      link: 'https://github.com/FaizanAhmeddd27/Blog-App-MERN',
    },
    {
      title: 'SavourFeast - Pizza Ordering Website',
      description: 'An interactive pizza ordering platform with menu browsing, customizable orders, shopping cart. Features promotional offers.',
      technologies: ['React.js', 'Redux', 'Tailwind CSS'],
      link: 'https://github.com/FaizanAhmeddd27/Pizza-Website-ReactJS-Redux-TailwindCSS',
    },
    {
      title: 'Real-Time Chat App',
      description: 'A messaging application supporting one-on-one and group chats with real-time updates. Includes typing indicators, message receipts.',
      technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.io'],
      link: 'https://github.com/FaizanAhmeddd27/Chat-App-Full-Stack',
    },
    {
      title: 'Inventory Management System',
      description: 'A console-based application for managing stock levels, adding/removing items, generating reports, and tracking sales/purchases. Supports multiple users with role-based access and data export.',
      technologies: ['C++', 'QT', 'SQLite'],
      link: 'https://github.com/FaizanAhmeddd27/Inventory-Management-System-Cpp-using-QT-and-SQLite',
    },
    {
      title: 'Real Estate Website',
      description: 'A dynamic real estate platform built with React, Tailwind CSS, and Framer Motion, showcasing houses for sale with interactive listings, a home page, about section, projects portfolio, and client testimonials.',
      technologies: ['React.js', 'Tailwind CSS', 'Framer Motion'],
      link: 'https://github.com/FaizanAhmeddd27/Real-Estate-Website-ReactJs-TailwindCSS',
    },
  ];

  const textLines = [
    "Crafting innovative solutions with modern technologies",
    "Explore my projects on GitHub to see the code in action!",
    "Let's build something extraordinary together",
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 min-h-[1200px] overflow-visible">
      <FloatingBubbles />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 mb-6 tracking-tight"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundSize: '300% 300%' }}
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Explore my collection of innovative digital solutions
          </motion.p>
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.15, duration: 0.7, type: "spring", stiffness: 150 }}
                className="relative group cursor-pointer max-w-full mx-auto min-h-[400px] flex flex-col"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <motion.div
                  className="relative bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-4 sm:p-5 h-full overflow-hidden shadow-lg flex flex-col"
                  whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(236, 72, 153, 0.3)' }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  <motion.h3
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      scale: hoveredProject === index ? 1.1 : 1 
                    }}
                    transition={{ 
                      opacity: { duration: 0.5, delay: index * 0.15 + 0.1 },
                      x: { duration: 0.5, delay: index * 0.15 + 0.1 },
                      scale: { duration: 0.3 }
                    }}
                    className="text-lg sm:text-xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400"
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      color: hoveredProject === index ? '#ec4899' : '#d1d5db',
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: index * 0.15 + 0.2 },
                      x: { duration: 0.5, delay: index * 0.15 + 0.2 },
                      color: { duration: 0.3 },
                    }}
                    className="text-gray-300 text-center mb-6 font-medium leading-relaxed text-sm line-clamp-5 flex-grow"
                  >
                    {project.description}
                  </motion.p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + techIndex * 0.05 + 0.3, duration: 0.4 }}
                        className="px-2 py-1 bg-white/5 rounded-full text-xs text-cyan-300 border border-cyan-400/20"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                    className="block text-center py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold text-sm relative overflow-hidden"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setClickedProject(index)}
                  >
                    View Project
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: clickedProject === index ? 3 : 0, opacity: clickedProject === index ? [0.4, 0] : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.a>

                  <AnimatePresence>
                    {hoveredProject === index && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-sm"
                            initial={{ opacity: 0, scale: 0, x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -100 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 mb-16 max-w-3xl mx-auto min-h-[200px] bg-white/5 backdrop-blur-sm rounded-lg p-6 z-20"
        >
          {textLines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(236, 72, 153, 0.6)' }}
              transition={{
                opacity: { duration: 0.6, delay: index * 0.2 + 0.7, ease: "easeOut" },
                x: { duration: 0.6, delay: index * 0.2 + 0.7, ease: "easeOut" },
                backgroundPosition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3 },
                textShadow: { duration: 0.3 },
              }}
              className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4 leading-relaxed"
              style={{ backgroundSize: '200% 200%' }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;