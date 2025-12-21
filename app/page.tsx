"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LanguageContext } from "./context/LanguageContext";

/* ---------------- KYC Options ---------------- */

const kycOptions = [
  { key: "digilocker", route: "/digilocker", image: "/digilocker.jpeg" },
  { key: "document", route: "/document", image: "/document.jpg" },
  { key: "face", route: "/face-verification", image: "/facevarification.jpg" },
];

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

  हिन्दी: {
    headerTitle: "भारत के लिए हल्का KYC",
    headerDesc:
      "सभी के लिए सरल, तेज़ और सुरक्षित KYC। ऑफ़लाइन और कम नेटवर्क पर भी काम करता है।",
    digilocker: "डिजिलॉकर",
    document: "दस्तावेज़ KYC",
    face: "चेहरा सत्यापन",
    aboutUs: "हमारे बारे में",
    aboutPoints: [
      "हम सभी के लिए हल्का और उपयोगकर्ता-अनुकूल KYC समाधान प्रदान करते हैं।",
      "हमारा ऐप कम नेटवर्क क्षेत्रों के लिए अनुकूलित है।",
      "आपके दस्तावेज़ और चेहरा डेटा सुरक्षित है।",
      "भारत भर में बहु-भाषा समर्थन।",
      "तेज़ और परेशानी मुक्त सत्यापन।",
    ],
    chatPlaceholder: "KYC के बारे में मुझसे कुछ भी पूछें...",
  },

  தமிழ்: {
    headerTitle: "இந்தியாவுக்கான எளிய KYC",
    headerDesc:
      "எல்லோருக்கும் எளிதான, வேகமான மற்றும் பாதுகாப்பான KYC.",
    digilocker: "டிஜிலாக்கர்",
    document: "ஆவண KYC",
    face: "முக சரிபார்ப்பு",
    aboutUs: "எங்களை பற்றி",
    aboutPoints: [
      "எளிய KYC தீர்வு.",
      "குறைந்த இணையத்திலும் செயல்படும்.",
      "பாதுகாப்பான தரவு.",
      "பல மொழி ஆதரவு.",
      "வேகமான சரிபார்ப்பு.",
    ],
    chatPlaceholder: "KYC பற்றி கேளுங்கள்...",
  },
};

/* ---------------- FAQ ---------------- */

const predefinedQueries = [
  {
    q: "How does DigiLocker KYC work?",
    a: "DigiLocker KYC fetches user documents securely from DigiLocker.",
  },
  {
    q: "Which documents can I use?",
    a: "Aadhaar, PAN, Driving License, or Voter ID.",
  },
  {
    q: "How is face verification done?",
    a: "Face match and liveness checks.",
  },
  {
    q: "Can the app work offline?",
    a: "Yes, it supports offline retry.",
  },
  {
    q: "How do we integrate?",
    a: "Via SDK or web redirection.",
  },
];

/* ---------------- Features ---------------- */

const keyFeatures = [
  {
    title: "Offline & Retry-Friendly",
    desc: "Works even with low connectivity.",
    icon: "/onlineoffline.jpg",
  },
  {
    title: "SDK & Web Integration",
    desc: "Easy integration for partners.",
    icon: "/sdk.webp",
  },
  {
    title: "Face Match & Liveness",
    desc: "Ensures genuine user verification.",
    icon: "/faceauthenticaton.jpg",
  },
  {
    title: "Multi-Language Support",
    desc: "Supports all Indian languages.",
    icon: "/multilang.jpg",
  },
];

/* ---------------- ChatBox ---------------- */

type ChatMessage = { role: "user" | "bot"; text: string };

function ChatBox({
  t,
  openProp,
  setOpenProp,
}: {
  t: Translation;
  openProp?: boolean;
  setOpenProp?: (open: boolean) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(openProp || false);

  useEffect(() => {
    if (openProp !== undefined) setOpen(openProp);
  }, [openProp]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {open ? "Close Chat" : "KYC Assistant"}
      </button>

      {open && (
        <div className="w-96 h-[450px] bg-white border rounded shadow-lg mt-2">
          <div className="p-3 font-semibold border-b text-black">
            KYC Assistant
          </div>
          <div className="p-3 overflow-y-auto h-[320px]">
            {messages.map((m, i) => (
              <p key={i} className="text-black">{m.text}</p>
            ))}
          </div>
          <div className="flex p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border p-2"
              placeholder={t.chatPlaceholder}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-purple-500 text-white px-4"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function Page() {
  const router = useRouter();
  const [language, setLanguage] = useState("English");
  const [chatOpen, setChatOpen] = useState(false);

  // IMPORTANT: fallback prevents crash
  const t = translations[language] || translations["English"];

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <main className="min-h-screen bg-white font-sans">

        {/* NAVBAR */}
        <nav className="bg-blue-600 text-white fixed top-0 w-full z-50 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <div className="font-bold text-lg">KYC Bharat</div>
            <div className="flex gap-4 items-center">
              <a href="#kyc-options">KYC Options</a>
              <a href="#faq">FAQ</a>
              <a href="#about">About Us</a>
              <button onClick={() => setChatOpen(true)}>Help</button>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-blue-600 text-white border"
              >
                {languages.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
        </nav>

        <div className="h-20" />

        {/* HERO */}
        <header className="text-center p-10">
          <h1 className="text-4xl font-bold">{t.headerTitle}</h1>
          <p className="text-lg">{t.headerDesc}</p>
        </header>

        {/* KYC OPTIONS */}
        <section
          id="kyc-options"
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-12"
        >
          {kycOptions.map((o) => (
            <div
              key={o.key}
              onClick={() => router.push(o.route)}
              className="flex flex-col items-center p-6 bg-blue-500 rounded-xl shadow-lg cursor-pointer text-white"
            >
              <Image src={o.image} alt={o.key} width={128} height={128} />
              <h3 className="text-xl font-semibold mt-4">{t[o.key]}</h3>
            </div>
          ))}
        </section>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Key Features & Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-6 bg-blue-100 rounded-lg shadow-md"
              >
                <Image src={f.icon} alt={f.title} width={64} height={64} />
                <h3 className="font-semibold mt-2 text-black">{f.title}</h3>
                <p className="text-black text-sm text-center">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ & ABOUT */}
        <section className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4 mb-12">
          <div id="faq" className="lg:w-1/2 bg-yellow-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Frequently Asked Questions
            </h2>
            {predefinedQueries.map((q, i) => (
              <div key={i}>
                <p className="font-semibold text-black">{q.q}</p>
                <p className="ml-2 text-black">{q.a}</p>
              </div>
            ))}
          </div>

          <div id="about" className="lg:w-1/2 bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black">{t.aboutUs}</h2>
            <ul className="list-disc pl-5 text-black space-y-2">
              {t.aboutPoints.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        <ChatBox t={t} openProp={chatOpen} setOpenProp={setChatOpen} />
      </main>
    </LanguageContext.Provider>
  );
}
