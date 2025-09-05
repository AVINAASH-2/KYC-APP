"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DocumentKYCPage() {
  const router = useRouter();
  const [docType, setDocType] = useState("Aadhaar");
  const [file, setFile] = useState<File | null>(null);
  const [idNumber, setIdNumber] = useState("");
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const typeMap: Record<string, string> = {
    Aadhaar: "aadhaar",
    PAN: "pan",
    "Driving License": "dl",
    "Voter ID": "voterid",
  };

  const handleUpload = async () => {
    // Validation
    if (docType === "Aadhaar" && idNumber.length !== 12) {
      setNotification({ msg: "⚠️ Aadhaar number must be exactly 12 digits", type: "error" });
      return;
    }
    if (docType === "PAN" && idNumber.length !== 10) {
      setNotification({ msg: "⚠️ PAN number must be exactly 10 characters", type: "error" });
      return;
    }
    if (docType === "Driving License" || docType === "Voter ID") {
      if (!file) {
        setNotification({ msg: `⚠️ Please upload your ${docType}`, type: "error" });
        return;
      }
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setNotification({ msg: "⚠️ Only PNG, JPEG, or PDF files are allowed", type: "error" });
        return;
      }
      const maxSize = 1.5 * 1024 * 1024; // 1.5 MB
      if (file.size > maxSize) {
        setNotification({ msg: "⚠️ File size should not exceed 1.5 MB", type: "error" });
        return;
      }
    }

    // Convert file to Base64 if exists
    let fileData: string | undefined = undefined;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      fileData = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
      });
    }

    // Send to backend
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          documentType: typeMap[docType],
          idNumber: idNumber || "N/A",
          fileName: file ? file.name : "N/A",
          fileData: fileData,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setNotification({ msg: `✅ ${docType} submitted successfully!`, type: "success" });
        setDocType("Aadhaar");
        setIdNumber("");
        setFile(null);
      } else {
        setNotification({ msg: `❌ Submission failed: ${data.error}`, type: "error" });
      }
    } catch (err) {
      console.error(err);
      setNotification({ msg: "❌ Submission failed", type: "error" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 lg:px-16">
      {/* Notification */}
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`bg-white p-6 rounded-2xl shadow-2xl border-2 w-96 text-center relative ${
              notification.type === "success" ? "border-green-600" : "border-red-600"
            }`}
          >
            <p className={`text-lg font-semibold ${notification.type === "success" ? "text-green-600" : "text-red-600"} mb-6`}>
              {notification.msg}
            </p>
            <button
              onClick={() => setNotification(null)}
              className="absolute top-3 right-3 text-black font-bold hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-2 drop-shadow-md">Document KYC</h1>
        <p className="text-gray-700 sm:text-lg max-w-xl mx-auto leading-relaxed">
          Upload and verify your documents like <b>Aadhaar</b>, <b>PAN</b>, <b>Driving License</b>, or <b>Voter ID</b>.
        </p>
      </header>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col space-y-6">
        <div>
          <label className="text-blue-700 font-semibold mb-2 block">Choose Document</label>
          <select
            value={docType}
            onChange={(e) => { setDocType(e.target.value); setIdNumber(""); setFile(null); }}
            className="w-full p-3 border border-blue-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
          >
            <option>Aadhaar</option>
            <option>PAN</option>
            <option>Driving License</option>
            <option>Voter ID</option>
          </select>
        </div>

        {/* Input field */}
        {(docType === "Aadhaar" || docType === "PAN") && (
          <input
            type="text"
            placeholder={`Enter your ${docType} number`}
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            className="block w-full text-sm bg-white text-gray-900 border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* File upload */}
        {(docType === "Driving License" || docType === "Voter ID") && (
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm bg-white text-gray-900 border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleUpload}
            className="h-12 px-6 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
          <button
            onClick={() => router.push("/")}
            className="h-12 px-6 rounded-lg border border-gray-300 bg-white text-black font-semibold hover:bg-gray-100 shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Back
          </button>
        </div>
      </div>
    </main>
  );
}
