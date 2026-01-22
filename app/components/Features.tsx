"use client";

import { motion } from "framer-motion";
import { WifiOff, Code2, ScanFace, Languages } from "lucide-react";

const features = [
    {
        title: "Offline Capable",
        desc: "Works seamlessly even in low connectivity areas with smart retry logic.",
        icon: WifiOff,
        color: "text-rose-500"
    },
    {
        title: "Developer Friendly",
        desc: "Simple SDK integration and web redirection for instant onboarding.",
        icon: Code2,
        color: "text-blue-500"
    },
    {
        title: "AI Face Match",
        desc: "Advanced liveness detection and face matching algorithms.",
        icon: ScanFace,
        color: "text-violet-500"
    },
    {
        title: "20+ Languages",
        desc: "Built for Bharat. Supports all major regional languages.",
        icon: Languages,
        color: "text-amber-500"
    }
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose KYC Bharat?</h2>
                    <p className="text-lg text-slate-600">Built with performance and accessibility in mind, ensuring a smooth experience for every user across India.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 ${f.color}`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
