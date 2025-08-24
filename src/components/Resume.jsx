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
          size: Math.random() * 40 + 15, // 15-55px
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDuration: Math.random() * 10 + 8, // 8-18s
          opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
          delay: Math.random() * 4,
          direction: Math.random() > 0.5 ? 1 : -1,
          floatDistanceX: Math.random() * 100 + 50, // 50-150px
          floatDistanceY: Math.random() * 300 + 100, // 100-400px for shorter section
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

const Resume = () => {
  const resumeData = {
    name: 'Faizan Ahmed Khan',
    contact: {
      email: 'faizannn27@gmail.com',
      phone: '03122144331',
      linkedin: 'https://www.linkedin.com/in/faizan-ahmed-7b4364330/',
      github: 'https://github.com/FaizanAhmeddd27',
    },
    objective: 'Aspiring Full Stack Developer with hands-on experience in building dynamic web applications using React, Redux, Node.js, Express, and MongoDB. Seeking an internship opportunity to apply and expand my skills in a collaborative environment while contributing to impactful projects.',
    summary: 'Passionate Full Stack Developer with expertise in the MERN stack, skilled in crafting dynamic and responsive web applications. Proficient in frontend and backend technologies, with a strong foundation in JavaScript, React, Node.js, and database management. Eager to contribute innovative solutions and grow in a collaborative, fast-paced environment.',
    technicalSkills: {
      frontend: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Redux', 'Bootstrap', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs'],
      otherTools: ['Git & GitHub', 'Postman', 'Figma', 'NPM', 'VS Code'],
    },
    education: {
      degree: 'Bachelor in Computer Science',
      institution: 'NED University',
    },
  };

  const textLines = [
    "Open for Opportunities to Build Innovative Solutions",
    "Building the Future with Code and Creativity",
    "Let's Create Something Amazing Together",
  ];

  return (
    <section className="relative px-4 sm:px-6 md:px-12 min-h-[800px] overflow-visible">
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
            My Resume
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A showcase of my skills, experience, and passion for development
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 sm:p-8 mb-16"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
              {resumeData.name}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              <a href={`mailto:${resumeData.contact.email}`} className="hover:text-cyan-400">{resumeData.contact.email}</a> | {resumeData.contact.phone}
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">LinkedIn</a> | 
              <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400"> GitHub</a>
            </p>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-2">Objective</h4>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{resumeData.objective}</p>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h4 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-2">Summary</h4>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{resumeData.summary}</p>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-2">Technical Skills</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <h5 className="text-base sm:text-lg font-medium text-pink-400">Frontend</h5>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.technicalSkills.frontend.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-2 py-1 bg-white/5 rounded-full text-xs text-cyan-300 border border-cyan-400/20"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-base sm:text-lg font-medium text-pink-400">Backend</h5>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.technicalSkills.backend.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-2 py-1 bg-white/5 rounded-full text-xs text-cyan-300 border border-cyan-400/20"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-base sm:text-lg font-medium text-pink-400">Other Tools</h5>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resumeData.technicalSkills.otherTools.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-2 py-1 bg-white/5 rounded-full text-xs text-cyan-300 border border-cyan-400/20"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h4 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-2">Education</h4>
            <p className="text-gray-300 text-sm sm:text-base">{resumeData.education.degree}</p>
            <p className="text-gray-300 text-sm sm:text-base">{resumeData.education.institution}</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-16 mb-16 max-w-3xl mx-auto min-h-[200px] bg-white/5 backdrop-blur-sm rounded-lg p-6 z-20"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {textLines.map((line, index) => (
            <motion.p
              key={index}
              className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4 leading-relaxed"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, textShadow: '0 0 10px rgba(236, 72, 153, 0.6)' }}
              transition={{
                opacity: { duration: 0.6, delay: index * 0.2 + 0.7, ease: "easeOut" },
                x: { duration: 0.6, delay: index * 0.2 + 0.7, ease: "easeOut" },
                scale: { duration: 0.3 },
                textShadow: { duration: 0.3 },
              }}
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

export default Resume;