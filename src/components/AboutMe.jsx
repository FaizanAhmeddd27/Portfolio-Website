import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import about from "../assets/about.jpg";

const quotes = [
  "'Code is like humor. When you have to explain it, it's bad.' – Cory House",
  "'First, solve the problem. Then, write the code.' – John Johnson",
  "'Simplicity is the soul of efficiency.' – Austin Freeman",
  "'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.' – Martin Fowler",
  "'The best error message is the one that never shows up.' – Thomas Fuchs",
];

// Floating Bubbles Animation
const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 20; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 35 + 15, // 15-50px
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDuration: Math.random() * 10 + 10, // 10-20s
          opacity: Math.random() * 0.3 + 0.2, // 0.2-0.5
          delay: Math.random() * 6,
          direction: Math.random() > 0.5 ? 1 : -1,
          floatDistanceX: Math.random() * 60 + 30, // 30-90px
          floatDistanceY: Math.random() * 200 + 100, // 100-300px
          color: [
            'from-pink-500/40 to-purple-500/40',
            'from-cyan-400/40 to-teal-400/40',
            'from-purple-500/40 to-blue-500/40',
            'from-blue-400/40 to-cyan-400/40',
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
                       shadow-[0_0_20px_rgba(236,72,153,0.3)]`}
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
          20% {
            transform: translate(calc(0.4 * var(--float-x)), calc(-0.2 * var(--float-y))) scale(1.1);
          }
          40% {
            transform: translate(calc(-0.3 * var(--float-x)), calc(-0.5 * var(--float-y))) scale(0.95);
          }
          60% {
            transform: translate(calc(0.2 * var(--float-x)), calc(-0.8 * var(--float-y))) scale(1.05);
          }
          80% {
            transform: translate(calc(-0.1 * var(--float-x)), calc(-0.95 * var(--float-y))) scale(1);
          }
        }
      `}</style>
    </>
  );
};

// Enhanced Quote Rotator
const QuoteRotator = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-24 overflow-hidden mt-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentQuoteIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 italic text-gray-400 text-md border-l-4 border-cyan-400 pl-4
                     hover:text-gray-200 transition-colors duration-300"
        >
          {quotes[currentQuoteIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const ImageOrb = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, x: 100 }}
      animate={{ scale: 1, opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative flex justify-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden
                   shadow-[0_0_60px_20px_rgba(59,130,246,0.5)] border-4 border-transparent 
                   bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400"
      >
        <img
          src={about}
          alt="About Me"
          className="w-full h-full object-cover rounded-full transition-all duration-500
                     hover:brightness-110"
        />

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const Education = () => {
  const timeline = [
    {
      year: "20204-2028",
      title: "Bachelors in Computer Science",
      place: "NED University of Engineering & Technology",
    },
    {
      year: "2024",
      title: "Intermediate (Pre-Engineering)",
      place: "Completed from Karachi",
    },
  ];

  return (
    <div className="mt-12">
      <motion.h3
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl mb-8 font-black text-transparent bg-clip-text 
                   bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400
                   animate-pulse"
      >
        🎓 Education
      </motion.h3>

      <div className="relative border-l-2 border-cyan-400/30 pl-6 space-y-8">
        {timeline.map((edu, index) => (
          <motion.div
            key={edu.title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
            className="relative"
          >
            <span className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-gradient-to-br 
                             from-cyan-400 to-purple-500 shadow-lg" />
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 
                            backdrop-blur-md border border-white/10 rounded-lg p-4 
                            shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] 
                            transition-all duration-300">
              <h4 className="text-lg font-semibold text-cyan-300">{edu.title}</h4>
              <p className="text-sm text-gray-400">{edu.place}</p>
              <p className="text-xs text-gray-500 mt-1">{edu.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AboutMe = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center gap-12 py-10 px-6 md:px-20 overflow-hidden min-h-screen">
      <FloatingBubbles />

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 text-center md:text-left relative z-10 max-w-2xl"
      >
        {/* About Me Heading */}
        <div className="relative mb-8">
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl mb-4 font-black text-transparent bg-clip-text 
                       bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400
                       animate-pulse"
          >
            About Me
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="space-y-4 mb-6"
        >
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Hi, I'm <span className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors">Faizan Ahmed</span>,  
            a passionate <span className="text-pink-400 hover:text-pink-300 transition-colors">MERN Stack Developer</span>.
          </p>
          
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            I specialize in building interactive, scalable, and user-friendly applications 
            that solve real-world problems. With a keen eye for detail and a passion for 
            clean code, I transform ideas into digital experiences.
          </p>
        </motion.div>

        <Education />

        <QuoteRotator />
      </motion.div>

      <div className="relative">
        <ImageOrb />
      </div>
    </section>
  );
};

export default AboutMe;