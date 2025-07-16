"use client";

import React, { useState, useEffect, useRef } from "react";
import { SidebarProvider } from "@/components/sidebar/contexts/sidebar-context";
import { ThemeProvider } from "@/components/sidebar/contexts/theme-context";
import { AppSidebar } from "@/components/AppSidebar";
import "@/app/globals.css";

export default function Page() {
  const [message, setMessage] = useState('');
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const addReply = (role, content) => {
    setReplies((prev) => [...prev, { role, content }]);
  };

  useEffect(() => {
    const savedReplies = localStorage.getItem('chatReplies');
    if (savedReplies) {
      setReplies(JSON.parse(savedReplies));
    } else {
      setReplies([{ role: 'assistant', content: 'Welcome! How can I help you today?' }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatReplies', JSON.stringify(replies));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [replies]);

  const sendMessage = async () => {
  if (!message.trim() || loading) return;

  // Show user message immediately
  addReply('user', message);
  setLoading(true);
  const userMessage = message;
  setMessage('');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();

    if (data.error) {
      addReply('assistant', `❌ Error: ${data.error}`);
    } else {
      addReply('assistant', data.response || '⚠️ No response received.');
    }
  } catch (err) {
    console.error('API error:', err);
    addReply('assistant', '🚨 Failed to connect to AI.');
  } finally {
    setLoading(false);
  }
};



  return (
    <SidebarProvider>
      <ThemeProvider>
        <div className="flex min-h-screen bg-white dark:bg-[#121212] text-black dark:text-white">
          <AppSidebar />
          <main className="flex-1 p-6 overflow-hidden">
            <div className="flex flex-col justify-start h-full relative">
              <h1 className="text-xl font-bold mb-6 text-center bg-[#dfdfdf] dark:bg-[#2d2d2d] text-black dark:text-white p-4 rounded-full w-fit mx-auto">
                Chat with your AI-Assistant
              </h1>

              <div className="space-y-3 overflow-y-auto pb-32 max-h-[calc(100vh-200px)] hide-scrollbar w-[90%] mx-auto relative">
                {replies.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3 my-1 rounded-xl max-w-[80%] whitespace-pre-wrap
                        ${msg.role === 'user'
                          ?'bg-[#2a2a2a] text-white  dark:bg-transparent'
                          :'bg-white text-black dark:bg-gray-300 dark:text-black' 
                        }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="text-gray-400 italic text-sm"> <span className="blinking-dot"></span></div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Bar */}
              <div className="w-[90%] bg-[#dfdfdf] dark:bg-[#2a2a2a] gap-4 rounded-full p-4 absolute bottom-5 left-1/2 transform -translate-x-1/2 flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Anything......."
                  className="w-full p-3 rounded-full outline-none h-full text-black dark:text-white dark:bg-[#2a2a2a]"
                />
                <button
                  className="p-4 bg-white dark:bg-gray-200 rounded-full disabled:opacity-50"
                  onClick={sendMessage}
                  disabled={loading}
                >
                  <img src="/send.png" alt="Send" className="w-5 h-5 object-contain" />
                </button>
              </div>
            </div>
          </main>
          <div className="bg-transparent text-center p-4 max-w-72 border-2">
            <h1 className="text-xl font-bold w-full">Projects</h1>
            <div className="flex flex-col gap-2 mt-4 w-[95%] mx-auto">
              <div className="flex justify-around items-center bg-[#dfdfdf] dark:bg-[#2a2a2a] hover:bg-[#7e7e7e] p-3 rounded-2xl">
                <div className="overflow-hidden w-[90%] h-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, aliquid!</div>
                <div><img src="/more.svg" alt="" srcset="" className="invert dark:invert-0" /></div>
              </div>
              <div className="flex justify-around items-center bg-[#dfdfdf] dark:bg-[#2a2a2a] hover:bg-[#7e7e7e] p-3 rounded-2xl">
                <div className="overflow-hidden w-[90%] h-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, aliquid!</div>
                <div><img src="/more.svg" alt="" srcset="" className="invert dark:invert-0" /></div>
              </div>
              <div className="flex justify-around items-center bg-[#dfdfdf] dark:bg-[#2a2a2a] hover:bg-[#7e7e7e] p-3 rounded-2xl">
                <div className="overflow-hidden w-[90%] h-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, aliquid!</div>
                <div><img src="/more.svg" alt="" srcset="" className="invert dark:invert-0" /></div>
              </div>
              <div className="flex justify-around items-center bg-[#dfdfdf] dark:bg-[#2a2a2a] hover:bg-[#7e7e7e] p-3 rounded-2xl">
                <div className="overflow-hidden w-[90%] h-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, aliquid!</div>
                <div><img src="/more.svg" alt="" srcset="" className="invert dark:invert-0" /></div>
              </div>
              <div className="flex justify-around items-center bg-[#dfdfdf] dark:bg-[#2a2a2a] hover:bg-[#7e7e7e] p-3 rounded-2xl">
                <div className="overflow-hidden w-[90%] h-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, aliquid!</div>
                <div><img src="/more.svg" alt="" srcset="" className="invert dark:invert-0" /></div>
              </div>
            </div>
          </div>
        </div>

      </ThemeProvider>
    </SidebarProvider>
  );
}
