import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TextType from "./TextType";
import mypic from "../assets/mypic.jpg";

const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 20; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 80 + 30,
          left: Math.random() * 100,
          animationDuration: Math.random() * 15 + 20,
          opacity: Math.random() * 0.6 + 0.1,
          delay: Math.random() * 20,
          color: Math.random() > 0.5 ? "pink" : Math.random() > 0.5 ? "purple" : "blue",
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  const getGradientColor = (color) => {
    switch (color) {
      case "pink":
        return "from-pink-400/20 to-pink-600/10";
      case "purple":
        return "from-purple-400/20 to-purple-600/10";
      case "blue":
        return "from-blue-400/20 to-blue-600/10";
      default:
        return "from-pink-400/20 to-purple-600/10";
    }
  };

  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`absolute rounded-full bg-gradient-to-br ${getGradientColor(
              bubble.color
            )} backdrop-blur-sm border border-white/10 shadow-lg`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              opacity: bubble.opacity,
              animation: `floatUp ${bubble.animationDuration}s infinite linear`,
              animationDelay: `${bubble.delay}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-200px) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

const Banner = () => {
  return (
    <motion.section
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen text-white px-6 md:px-12 overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <FloatingBubbles />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-5 flex-shrink-0 mb-8 md:mb-0 md:mr-12 order-2 md:order-1 lg:order-2 relative"
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full p-[4px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 shadow-[0_0_50px_rgba(168,85,247,0.7)]">
          <img
            src={mypic}
            alt="Faizan Ahmed"
            className="w-full h-full object-cover rounded-full"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-pink-400/50"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      <div className="text-center mt-20 md:text-left relative z-10 max-w-2xl">
        <div className="relative mt-6 md:mt-0 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[24px] md:text-5xl mb-4 font-black text-transparent bg-clip-text 
                       bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 animate-pulse"
          >
            👋 Hi I'm Faizan Ahmed
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          />
        </div>

        <TextType
          text={[
            "I am a Full-Stack Developer",
            "I am a Frontend Developer",
            "I am a Backend Developer",
          ]}
          typingSpeed={75}
          deletingSpeed={40}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="text-xl md:text-2xl font-medium text-pink-300"
          textColors={["#f472b6", "#c084fc", "#38bdf8"]}
        />

        <div className="mt-6">
          <p className="text-sm md:text-base text-gray-300 leading-relaxed hover:text-pink-300 transition duration-300 drop-shadow-md">
            I'm a dedicated developer with a passion for crafting clean and efficient solutions. 
            I focus on building responsive, user-friendly applications with modern technologies. 
            Constantly learning and adapting to stay ahead in the ever-growing tech world. 
            Driven by curiosity, I aim to turn ideas into impactful digital experiences.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Banner;