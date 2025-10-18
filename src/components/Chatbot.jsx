import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = "AIzaSyDnO3k0GrMIpAT84SG87PoaBHv33CZXNTk"; // your key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const portfolioContext = `
You are Faizan's personal portfolio assistant.
Faizan Ahmed is a Frontend & MERN Stack Developer from Karachi, Pakistan.
He builds responsive, modern web apps using React.js, Tailwind CSS, Node.js, Express.js, MongoDB, and Redux.
He is studying BS Computer Science at NED University (2024–2028).

Portfolio Sections:
- Home: Intro about Faizan Ahmed, Frontend Developer.
- About: MERN Stack Developer passionate about clean code and modern solutions.
- Skills: HTML, CSS, JS, React, Tailwind, Node, Express, MongoDB, TypeScript, C, C++, Python.
- Projects:
  1. Blog App (MERN)
  2. SavourFeast Pizza Website (React + Redux)
  3. Real-Time Chat App (Socket.io)
  4. Inventory Management System (C++, QT, SQLite)
  5. Real Estate Website (React, Tailwind, Framer Motion)
- Contact: faizannn27@gmail.com | 03122144331

If asked about Faizan, his work, skills, or projects — reply politely, confidently, and contextually.
Never say “I don’t understand.” If unclear, give a helpful response about Faizan or his portfolio.
`;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { sender: "user", text: input };
    setMessages([...messages, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const result = await model.generateContent(`${portfolioContext}\nUser: ${input}`);
      const reply = result.response.text();
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Unable to connect to Gemini API." },
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 500); 
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-4 top-4 sm:bottom-6 sm:top-auto sm:right-6
          bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600
          text-white px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg
          flex items-center justify-center gap-2 transition-all duration-300
          z-[1000] hover:scale-110 text-xs sm:text-sm font-semibold
          min-w-[2.5rem] min-h-[2.5rem] sm:min-w-[auto]"
        >
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">Chat with AI</span>
        </button>
      )}

      {(open || isClosing) && (
        <div
          className={`fixed inset-0 sm:bottom-6 sm:right-6 sm:top-auto sm:left-auto
          w-full sm:w-[380px] md:w-[400px] h-full sm:h-[520px]
          bg-gradient-to-b from-[#0f172a] via-[#1e1a78] to-[#2d1b69]
          text-white rounded-none sm:rounded-2xl shadow-2xl
          border border-indigo-700/40 z-[999] flex flex-col overflow-hidden
          transition-all duration-500 ${isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}
        >
          <div className="flex justify-between items-center
          bg-gradient-to-r from-indigo-700 to-purple-700
          px-4 py-3 sm:px-5 sm:py-4">
            <h2 className="font-semibold text-base sm:text-lg">
              Faizan’s AI Chatbot
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-300 hover:text-white text-lg sm:text-xl transition-all"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3
          bg-[#0f172a]/40 backdrop-blur-md custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-gray-300 text-sm bg-[#1e1a78]/40
              border border-indigo-600/30 rounded-2xl p-3 sm:p-4 animate-fadeIn">
                👋 Hi! I'm Faizan’s AI assistant. Ask me about his skills,
                experience, or projects!
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[75%] p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-br-none"
                      : "bg-[#1e1a78]/60 border border-indigo-600/30 text-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-sm animate-pulse">
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            className="p-3 sm:p-4 flex gap-2 border-t border-indigo-800
            bg-[#0f172a]/90 backdrop-blur-md"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-[#1e1a78]/50 p-2.5 sm:p-3 rounded-2xl
              outline-none text-white text-xs sm:text-sm placeholder-gray-400
              border border-indigo-700 focus:border-purple-500
              transition-all duration-300"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-700
              hover:from-indigo-500 hover:to-purple-600 disabled:opacity-50
              rounded-2xl px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm
              font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(20px) scale(0.95); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-out; }
        .animate-slideDown { animation: slideDown 0.5s ease-out; }

        /* Scrollbar Styling */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e1a78; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #a855f7, #ec4899);
          border-radius: 10px;
        }

        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          .fixed.inset-0 {
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }
          .fixed.right-4.top-4 {
            right: 4rem; /* Maintained position to the left */
            top: 1rem;
            padding: 0.75rem;
            min-width: 3rem;
            min-height: 3rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
          }
          .flex.items-center.justify-center.gap-2 {
            justify-content: center;
            align-items: center;
          }
          .text-xs.sm\\:text-sm {
            font-size: 0.75rem;
          }
          .min-w-\\[2\\.5rem\\].sm\\:min-w-\\[auto\\] {
            min-width: 3rem;
          }
        }
      `}</style>
    </>
  );
}