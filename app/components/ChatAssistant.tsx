"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "bot"; text: string };

export function ChatAssistant({ t }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([{ role: "bot", text: "Hello! How can I help you with your KYC today?" }]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: "user", text: input }]);
        setInput("");

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: "bot", text: "That's a great question! Our support team is looking into it." }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-1.5 rounded-full">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">KYC Assistant</h3>
                                    <p className="text-xs text-blue-100">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50"
                        >
                            {messages.map((m, i) => (
                                <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                                        m.role === 'user'
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                                    )}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask something..."
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg shadow-blue-600/30 transition-all"
            >
                <MessageCircle size={24} />
            </motion.button>
        </div>
    );
}
