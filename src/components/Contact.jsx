import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

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

const Contact = () => {
  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending...');
    const formData = new FormData(event.target);

    formData.append('access_key', '5605de03-b5a9-42d8-b007-09273201b800');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult('');
      toast.success('Message Sent Successfully!');
      event.target.reset();
    } else {
      console.error('Error:', data);
      toast.error(' ' + data.message);
      setResult('');
    }
  };

  const textLines = [
    "Let's Connect and Build Something Great",
    "Your Ideas, My Code",
    "Reach Out for Collaboration",
  ];

  return (
    <section className="relative py-10 sm:py-32 px-4 sm:px-6 md:px-12 min-h-[800px] overflow-visible">
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
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ backgroundSize: '300% 300%' }}
          >
            Contact Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Have a question or idea? Send me a message below 👇
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <motion.label
                className="block text-sm sm:text-base text-gray-300 mb-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Your Name
              </motion.label>
              <motion.input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full bg-transparent border border-cyan-400/30 rounded-lg py-3 px-4 text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)' }}
                transition={{ duration: 0.6, delay: 0.45 }}
              />
            </div>
            <div className="flex-1">
              <motion.label
                className="block text-sm sm:text-base text-gray-300 mb-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Your Email
              </motion.label>
              <motion.input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full bg-transparent border border-cyan-400/30 rounded-lg py-3 px-4 text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)' }}
                transition={{ duration: 0.6, delay: 0.55 }}
              />
            </div>
          </div>
          <div className="my-6">
            <motion.label
              className="block text-sm sm:text-base text-gray-300 mb-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Message
            </motion.label>
            <motion.textarea
              name="message"
              placeholder="Write your message..."
              required
              className="w-full bg-transparent border border-cyan-400/30 rounded-lg py-3 px-4 text-gray-300 h-40 resize-none focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              whileFocus={{ scale: 1.02, boxShadow: '0 0 10px rgba(34, 211, 238, 0.4)' }}
              transition={{ duration: 0.6, delay: 0.65 }}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-12 rounded-full font-semibold text-sm relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {result || 'Send Message'}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: result ? 3 : 0, opacity: result ? [0.4, 0] : 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.form>

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
                opacity: { duration: 0.6, delay: index * 0.2 + 0.7, ease: 'easeOut' },
                x: { duration: 0.6, delay: index * 0.2 + 0.7, ease: 'easeOut' },
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

export default Contact;