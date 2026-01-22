"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, ChevronRight, Fingerprint, FileText, Scan } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const steps = [
    {
        id: "digilocker",
        title: "DigiLocker Verification",
        desc: "Fetch documents securely from Government database",
        icon: FileText,
        color: "bg-amber-100 text-amber-600",
        route: "/digilocker"
    },
    {
        id: "document",
        title: "Document Upload",
        desc: "Scan and upload your PAN or Aadhaar card",
        icon: Scan,
        color: "bg-blue-100 text-blue-600",
        route: "/document"
    },
    {
        id: "face",
        title: "Face Liveness",
        desc: "Quick selfie video to prove you are real",
        icon: Fingerprint,
        color: "bg-green-100 text-green-600",
        route: "/face-verification"
    }
];

export function Dashboard({ t }: any) {
    const router = useRouter();
    // Simulate progress (in a real app this would come from backend)
    const [progress, setProgress] = useState({
        digilocker: "pending", // pending, active, completed
        document: "pending",
        face: "pending"
    });

    return (
        <section id="dashboard" className="py-20 bg-slate-50/50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">You Verification Progress</h2>
                    <p className="text-slate-600">Complete these 3 simple steps to get fully verified.</p>
                </div>

                <div className="grid gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => router.push(step.route)}
                                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer overflow-hidden"
                            >
                                <div className="flex items-center gap-6">
                                    {/* Icon Box */}
                                    <div className={cn("p-4 rounded-xl", step.color)}>
                                        <Icon size={32} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {step.title}
                                            </h3>
                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                                                Step {index + 1}
                                            </span>
                                        </div>
                                        <p className="text-slate-500">{step.desc}</p>
                                    </div>

                                    {/* Action/Status */}
                                    <div className="flex items-center gap-4">
                                        <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-400">
                                            <Circle size={16} />
                                            Not Started
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar (Decorative) */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50">
                                    <div className="h-full bg-blue-600 w-0 group-hover:w-full transition-all duration-700" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
