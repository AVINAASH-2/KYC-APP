"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link"; // Use next/link if using App Router, or <a> for scrolling anchors on same page

export function Nav({ language, setLanguage, languages }: any) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Dashboard", href: "#dashboard" },
        { name: "Features", href: "#features" },
        { name: "FAQ", href: "#faq" },
        { name: "About", href: "#about" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "bg-white/80 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <ShieldCheck size={24} />
                        </div>
                        <span className={cn("text-xl font-bold tracking-tight", scrolled ? "text-slate-900" : "text-slate-900")}>
                            KYC<span className="text-blue-600">Bharat</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-white/50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            {languages.map((l: string) => (
                                <option key={l} value={l}>{l}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b"
                    >
                        <div className="px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-base font-medium text-slate-600 hover:text-blue-600"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
