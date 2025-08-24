import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Info, Layers, FolderKanban, Phone } from "lucide-react";
import coding from "../assets/coding.webp";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <Home size={20} className="text-pink-400" /> },
    { name: "About", icon: <Info size={20} className="text-pink-400" /> },
    { name: "Skills", icon: <Layers size={20} className="text-pink-400" /> },
    { name: "Projects", icon: <FolderKanban size={20} className="text-pink-400" /> },
    { name: "Contact", icon: <Phone size={20} className="text-pink-400" /> },
  ];

  const handleScroll = (id) => {
    setIsOpen(false); 
    
    if (id === "top") {
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
      });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ 
          behavior: "smooth",
          block: "start" 
        });
      } else {
        console.warn(`Section with id "${id}" not found`);
      }
    }
  };

  return (
    <motion.header
      className="w-full fixed top-0 left-0 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={coding}
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-lg animate-pulse"
          />
          <h1 className="text-white font-extrabold text-xl tracking-wide">
            Faizan Ahmed
          </h1>
        </motion.div>

        <motion.nav
          className="hidden md:flex gap-8 text-white font-medium"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() =>
                handleScroll(item.name === "Home" ? "top" : item.name.toLowerCase())
              }
              className="relative group flex items-center gap-2 transition"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.icon}
              <span>{item.name}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-500"></span>
            </motion.button>
          ))}
        </motion.nav>

        <motion.button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden bg-gradient-to-br from-slate-900/95 to-gray-800 backdrop-blur-xl border border-cyan-400/20 rounded-lg mx-4 shadow-xl shadow-purple-500/20 flex flex-col items-center gap-6 py-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() =>
                handleScroll(item.name === "Home" ? "top" : item.name.toLowerCase())
              }
              className="flex items-center gap-3 text-lg font-medium text-white hover:text-pink-300 transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.icon}
              <span>{item.name}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Hero;