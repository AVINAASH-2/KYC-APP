"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

export function Hero({ t }: any) {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 ring-1 ring-blue-700/10">
                        <Shield size={16} />
                        Secure & Government Approved
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
                        {t.headerTitle}
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                        {t.headerDesc}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#dashboard"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
                        >
                            Start KYC Now
                            <ArrowRight size={20} />
                        </a>
                        <a
                            href="#features"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold border hover:bg-slate-50 transition-all"
                        >
                            Learn More
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
