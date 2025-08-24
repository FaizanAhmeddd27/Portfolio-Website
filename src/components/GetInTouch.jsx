import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Facebook } from "lucide-react";

const socialLinks = [
  {
    icon: <Linkedin size={40} />,
    url: "https://www.linkedin.com/in/faizan-ahmed-7b4364330/",
    color: "hover:bg-blue-500 hover:text-white",
  },
  {
    icon: <Github size={40} />,
    url: "https://github.com/FaizanAhmeddd27",
    color: "hover:bg-gray-800 hover:text-white",
  },
  {
    icon: <Facebook size={40} />,
    url: "https://www.facebook.com/faizan.ahmed.751080",
    color: "hover:bg-red-400 hover:text-white",
  },
];

// Floating Particles (background)
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 6 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: Math.random() * 20 + 15,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 10,
        direction: Math.random() > 0.5 ? 1 : -1,
        floatDistance: Math.random() * 100 + 50,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-pink-400/60 to-purple-400/60 
                     shadow-[0_0_10px_rgba(236,72,153,0.5)]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animation: `floatParticle ${p.animationDuration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`,
            "--float-x": `${p.direction * p.floatDistance}px`,
            "--float-y": `${p.floatDistance * 0.5}px`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(var(--float-x), calc(-1 * var(--float-y)));
          }
          50% {
            transform: translate(calc(-1 * var(--float-x)), calc(-0.5 * var(--float-y)));
          }
          75% {
            transform: translate(calc(0.5 * var(--float-x)), var(--float-y));
          }
        }
      `}</style>
    </div>
  );
};

const GetInTouch = () => {
  return (
    <motion.section
      className="relative flex flex-col items-center justify-center py-20 overflow-hidden"
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <FloatingParticles />

      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center 
                   bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
                   bg-clip-text text-transparent relative z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        Get in Touch
        <span className="absolute left-1/2 -bottom-2 w-32 h-1 
                         bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 
                         rounded-full -translate-x-1/2 animate-pulse shadow-lg shadow-pink-500/50"></span>
      </motion.h2>

      <div className="flex gap-10 mt-12 relative z-10">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-full transition-colors duration-300 ${link.color}`}
            whileHover={{ scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
          >
            <motion.div
              whileHover={{ boxShadow: "0px 0px 25px rgba(236,72,153,0.7)" }}
              transition={{ duration: 0.3 }}
            >
              {link.icon}
            </motion.div>
          </motion.a>
        ))}
      </div>

      <motion.p
        className="mt-8 text-gray-300 text-lg text-center max-w-xl relative z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        Let’s connect and build something amazing together 
      </motion.p>
    </motion.section>
  );
};

export default GetInTouch;