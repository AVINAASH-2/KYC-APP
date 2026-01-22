"use client";

import { useState } from "react";
import { LanguageContext } from "./context/LanguageContext";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Dashboard } from "./components/Dashboard";
import { Features } from "./components/Features";
import { FAQ } from "./components/FAQ";
import { ChatAssistant } from "./components/ChatAssistant";

/* ---------------- Languages ---------------- */

const languages = [
  "English",
  "हिन्दी",
  "தமிழ்",
  "తెలుగు",
  "ಕನ್ನಡ",
  "മലയാളം",
  "বাংলা",
  "मराठी",
  "ગુજરાતી",
  "ଓଡ଼ିଆ",
  "অসমীয়া",
  "नेपाली",
  "संस्कृत",
  "सिंधी",
  "कश्मीरी",
  "डोगरी",
  "कोंकणी",
  "भोजपुरी",
  "मணிப்பुरी",
  "मैथिली",
  "संথाली",
  "बोडो",
];

/* ---------------- Translations ---------------- */

type Translation = {
  headerTitle: string;
  headerDesc: string;
  digilocker: string;
  document: string;
  face: string;
  aboutUs: string;
  aboutPoints: string[];
  chatPlaceholder: string;
};

const translations: Record<string, Translation> = {
  English: {
    headerTitle: "Lightweight KYC for Bharat",
    headerDesc:
      "Simple, fast, and secure KYC for everyone. Works offline and low bandwidth friendly.",
    digilocker: "DigiLocker",
    document: "Document KYC",
    face: "Face Verification",
    aboutUs: "About Us",
    aboutPoints: [
      "We provide a lightweight and user-friendly KYC solution for everyone.",
      "Our app works offline and is optimized for low-bandwidth areas.",
      "Secure and privacy-first: your documents and face data are encrypted.",
      "Multi-language support to help users across India complete KYC easily.",
      "Fast verification with minimal steps to ensure hassle-free onboarding.",
    ],
    chatPlaceholder: "Ask me anything about KYC...",
  },
  // Add more translations as needed (kept minimal here for brevity but existing ones can be copied)
};

export default function Page() {
  const [language, setLanguage] = useState("English");

  // Safe Translation Access
  const t = translations[language] || translations["English"];

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <main className="min-h-screen relative">
        <Nav language={language} setLanguage={setLanguage} languages={languages} />

        <Hero t={t} />

        <Dashboard t={t} />

        <Features />

        <FAQ />

        <ChatAssistant t={t} />

        {/* Footer */}
        <footer className="bg-white py-12 border-t text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} KYC Bharat. All rights reserved.</p>
        </footer>
      </main>
    </LanguageContext.Provider>
  );
}
