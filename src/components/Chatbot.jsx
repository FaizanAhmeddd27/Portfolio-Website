import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageCircle } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  const API_KEY = "AIzaSyDnO3k0GrMIpAT84SG87PoaBHv33CZXNTk";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const portfolioContext = `
You are Faizan's personal portfolio assistant.
Faizan Ahmed is a Frontend & MERN Stack Developer from Karachi, Pakistan.
He builds responsive, modern web apps using React.js, Tailwind CSS, Node.js, Express.js, MongoDB, and Redux.
He is studying BS Computer Science at NED University (2024–2028).
`;

  const predefinedPrompts = [
    "Tell me about Faizan's skills",
    "What projects has Faizan worked on?",
    "How can I contact Faizan?",
    "What is Faizan's experience as a MERN Stack Developer?",
    "Tell me about Faizan's education",
  ];

  // Unlock audio on first click (mobile fix)
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          })
          .catch(() => {});
      }
      document.removeEventListener("click", unlockAudio);
    };
    document.addEventListener("click", unlockAudio);
  }, []);

  const sendMessage = async (prompt = input) => {
    if (!prompt.trim()) return;

    const newMsg = { sender: "user", text: prompt };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    try {
      const result = await model.generateContent(`${portfolioContext}\nUser: ${prompt}`);
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

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    sendMessage(prompt);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 400);
  };

  return (
    <>
      {/* Audio */}
      <audio ref={audioRef} src="/audio.wav" preload="auto" playsInline />

      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[99999]
          bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600
          text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300
          hover:scale-110 font-semibold"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Chat with AI</span>
        </button>
      )}

      {/* Chat Container */}
      {(open || isClosing) && (
        <div
          className={`fixed left-0 bottom-0 sm:right-6 sm:left-auto sm:bottom-10 
          w-full top-0 md:top-8  sm:w-[380px] md:w-[420px] h-[100vh] sm:h-[550px]
          bg-gradient-to-b from-[#0f172a] via-[#1e1a78] to-[#2d1b69]
          text-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-indigo-700/40
          flex flex-col overflow-hidden z-[99999] transition-all duration-500
          ${isClosing ? "animate-slideDown" : "animate-slideUp"}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-indigo-700 to-purple-700 px-4 py-3">
            <h2 className="font-semibold text-base sm:text-lg">Faizan’s AI Chatbot</h2>
            <button onClick={handleClose} className="text-gray-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#0f172a]/40 backdrop-blur-md custom-scrollbar">
            {messages.length === 0 && (
              <>
                <div className="text-gray-300 text-sm bg-[#1e1a78]/40 border border-indigo-600/30 rounded-2xl p-4 animate-fadeIn">
                  👋 Hi! I'm Faizan’s AI assistant. Ask me about his skills, experience, or projects!
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-xs sm:text-sm">Try these prompts:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {predefinedPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handlePromptClick(prompt)}
                        className="text-left text-gray-200 text-xs sm:text-sm bg-[#1e1a78]/60 border border-indigo-600/30 rounded-lg p-2 hover:bg-indigo-600/80 transition-all duration-200"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
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

            {loading && <div className="text-gray-400 text-sm animate-pulse">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t border-indigo-800 bg-[#0f172a]/90 backdrop-blur-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="flex-1 bg-[#1e1a78]/50 p-3 rounded-2xl outline-none text-white text-sm placeholder-gray-400 border border-indigo-700 focus:border-purple-500 transition-all"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 disabled:opacity-50 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(100%);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e1a78;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #a855f7, #ec4899);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
