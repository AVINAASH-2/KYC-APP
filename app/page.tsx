"use client";

import { useRouter } from "next/navigation";
import { useState, createContext, useContext, useEffect } from "react";

// --- Language Context ---
const LanguageContext = createContext({
  language: "English",
  setLanguage: (lang: string) => {},
});
export const useLanguage = () => useContext(LanguageContext);

// --- KYC Options ---
const kycOptions = [
  { key: "digilocker", route: "/digilocker", image: "/digilocker.jpeg" },
  { key: "document", route: "/document", image: "/document.jpg" },
  { key: "face", route: "/face-verification", image: "/facevarification.jpg" },
];

// --- Languages ---
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
  "मणिपुरी",
  "मैथिली",
  "संथाली",
  "बोडो",
];

// --- Translations ---
const translations: Record<string, any> = {
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
      "हमारा ऐप ऑफ़लाइन काम करता है और कम नेटवर्क क्षेत्रों के लिए अनुकूलित है।",
      "सुरक्षित और गोपनीयता-प्रथम: आपके दस्तावेज़ और चेहरा डेटा एन्क्रिप्टेड हैं।",
      "भारत भर में उपयोगकर्ताओं को KYC आसानी से पूरा करने में मदद करने के लिए बहु-भाषा समर्थन।",
      "न्यूनतम चरणों के साथ तेज़ सत्यापन, परेशानी मुक्त ऑनबोर्डिंग सुनिश्चित करता है।",
    ],
    chatPlaceholder: "KYC के बारे में मुझसे कुछ भी पूछें...",
  },
};

// --- Predefined Queries Section ---
const predefinedQueries = [
  {
    q: "How does DigiLocker KYC work?",
    a: "DigiLocker KYC fetches user documents securely from DigiLocker and verifies their authenticity. Works even in low-bandwidth conditions.",
  },
  {
    q: "Which documents can I use for document-based KYC?",
    a: "You can use Aadhaar, PAN, Driving License, or Voter ID for document-based KYC.",
  },
  {
    q: "How is face verification done?",
    a: "Face verification includes liveness checks and face-matching with submitted documents to ensure the person is genuine.",
  },
  {
    q: "Can the app work offline?",
    a: "Yes. We store minimal data locally and allow retry/resume when network is restored.",
  },
  {
    q: "How do we integrate with other apps?",
    a: "Integration is possible via SDK or web redirection. External apps can trigger KYC flows securely.",
  },
];

// --- Features Section ---
const keyFeatures = [
  {
    title: "Offline & Retry-Friendly",
    desc: "Perform KYC even with low connectivity and resume automatically if it fails.",
    icon: "/onlineoffline.jpg",
  },
  {
    title: "SDK & Web Integration",
    desc: "Integrate KYC flows via SDK or web redirection.",
    icon: "/sdk.webp",
  },
  {
    title: "Face Match & Liveness",
    desc: "Ensure the person is genuine using liveness and face-match checks.",
    icon: "/faceauthenticaton.jpg",
  },
  {
    title: "Multi-Language Support",
    desc: "Supports all official Indian languages for smooth KYC onboarding.",
    icon: "/multilang.jpg",
  },
];

// --- ChatBox Component ---
function ChatBox({
  t,
  openProp,
  setOpenProp,
}: {
  t: any;
  openProp?: boolean;
  setOpenProp?: (open: boolean) => void;
}) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(openProp || false);

  useEffect(() => {
    if (openProp !== undefined) setOpen(openProp);
  }, [openProp]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    // offline check
    if (!navigator.onLine) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ You are offline. Please reconnect to get AI answers." },
      ]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", text: userMsg }] }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "bot", text: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "❌ Error: " + (data.error || "Failed to get response") },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "bot", text: "❌ Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    const newOpen = !open;
    setOpen(newOpen);
    if (setOpenProp) setOpenProp(newOpen);

    if (!newOpen) {
      // clear messages when chat closed
      setMessages([]);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start">
      <button
        onClick={handleToggle}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg font-semibold mb-2 hover:bg-blue-700"
      >
        {open ? "Close Chat" : "KYC Assistant"}
      </button>

      {open && (
        <div className="w-96 h-[500px] bg-white border border-purple-400 rounded-lg shadow-lg flex flex-col">
          <div className="p-3 border-b border-purple-400 font-semibold text-black">
            KYC Assistant
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${
                  m.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    m.role === "user"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {m.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <span className="inline-block px-3 py-2 rounded-lg bg-gray-200 text-black">
                  ⏳ Thinking...
                </span>
              </div>
            )}
          </div>
          <div className="flex border-t border-purple-400 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder={t.chatPlaceholder}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-purple-500 text-white px-4 py-2 rounded font-semibold hover:bg-purple-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- HomePage ---
export default function HomePage() {
  const router = useRouter();
  const [language, setLanguage] = useState("English");
  const t = translations[language] || translations["English"];
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <main className="min-h-screen font-sans bg-white">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white fixed top-0 left-0 w-full z-50 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <div className="font-bold text-lg cursor-pointer">KYC Bharat</div>
            <div className="flex gap-4 items-center">
              <a href="#kyc-options" className="hover:underline">
                KYC Options
              </a>
              <a href="#faq" className="hover:underline">
                FAQ
              </a>
              <a href="#about" className="hover:underline">
                About Us
              </a>
              <button
                onClick={() => setChatOpen(true)}
                className="hover:underline font-medium"
              >
                Help
              </button>

              <div className="flex items-center ml-6">
                <label
                  htmlFor="language"
                  className="text-white font-medium mr-2"
                >
                  Language:
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="p-1 border border-gray-300 rounded-md text-white bg-blue-600 focus:ring-2 focus:ring-blue-500"
                  style={{ appearance: "menulist" }}
                >
                  {languages.map((lang) => (
                    <option
                      key={lang}
                      value={lang}
                      className="bg-blue-600 text-white"
                    >
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </nav>

        {/* Spacer */}
        <div className="h-20"></div>

        {/* Hero */}
        <header className="relative text-gray-900 p-10 rounded-lg mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t.headerTitle}</h1>
          <p className="text-lg sm:text-xl">{t.headerDesc}</p>
        </header>

        {/* KYC Options */}
        <section
          id="kyc-options"
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-12"
        >
          {kycOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => router.push(option.route)}
              className="flex flex-col items-center p-6 bg-blue-500 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer text-white"
            >
              <img
                src={option.image}
                alt={option.key}
                className="w-32 h-32 mb-4 rounded"
              />
              <h3 className="text-xl font-semibold">{t[option.key]}</h3>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Key Features & Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((f, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-6 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <img src={f.icon} alt={f.title} className="w-16 h-16 mb-4" />
                <h3 className="font-semibold mb-2 text-black">{f.title}</h3>
                <p className="text-black text-sm text-center">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ & About */}
        <section className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-4 mb-12">
          <div
            id="faq"
            className="lg:w-1/2 bg-yellow-100 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-black">
              Frequently Asked Questions
            </h2>
            <ul className="space-y-4">
              {predefinedQueries.map((q, idx) => (
                <li key={idx}>
                  <p className="font-semibold text-black">{q.q}</p>
                  <p className="ml-2 text-black">{q.a}</p>
                </li>
              ))}
            </ul>
          </div>

          <div
            id="about"
            className="lg:w-1/2 bg-blue-50 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-black">
              {t.aboutUs}
            </h2>
            <ul className="list-disc pl-5 text-black space-y-2 text-sm sm:text-base">
              {t.aboutPoints.map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ChatBox */}
        <ChatBox t={t} openProp={chatOpen} setOpenProp={setChatOpen} />
      </main>
    </LanguageContext.Provider>
  );
}
