"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const predefinedQueries = [
    {
        q: "How does DigiLocker KYC work?",
        a: "DigiLocker KYC fetches user documents securely from DigiLocker. You simply log in with your credentials, and the system verifies your identity instantly.",
    },
    {
        q: "Which documents can I use?",
        a: "We currently support Aadhaar, PAN, Driving License, or Voter ID for verification purposes.",
    },
    {
        q: "How is face verification done?",
        a: "We use advanced AI to perform face matching and liveness checks to ensure the person verifying is physically present.",
    },
    {
        q: "Can the app work offline?",
        a: "Yes! Our unique offline-retry mechanism allows you to complete steps even with spotty internet. Data syncs when you're back online.",
    },
    {
        q: "How do we integrate?",
        a: "We offer both SDKs for mobile apps and web redirection URLs for seamless integration.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-blue-100 text-blue-600">
                        <HelpCircle size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-600">Got questions? We've got answers.</p>
                </div>

                <div className="space-y-4">
                    {predefinedQueries.map((q, i) => (
                        <div
                            key={i}
                            className={cn(
                                "bg-white rounded-2xl overflow-hidden transition-all duration-300",
                                openIndex === i ? "shadow-lg ring-1 ring-blue-500/20" : "shadow-sm hover:shadow-md"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className="font-semibold text-slate-900 text-lg">{q.q}</span>
                                <span className={cn("p-2 rounded-full transition-colors", openIndex === i ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400")}>
                                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                            {q.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
