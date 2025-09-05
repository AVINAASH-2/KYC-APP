"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DigiLockerPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const MAX_FILE_SIZE_MB = 2.5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;

    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setNotification(`⚠️ File size exceeds ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setNotification("⚠️ Please select a file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64data = reader.result as string;

      try {
        const res = await fetch("/api/digilocker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Test User",
            documentType: "digilocker",
            idNumber: "N/A",
            fileName: file.name,
            fileData: base64data,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setNotification("✅ DigiLocker file submitted successfully!");
          setFile(null);
          setPreview(null);

          // Redirect to DigiLocker portal after short delay
          setTimeout(() => {
            window.location.href = "https://www.digilocker.gov.in/";
          }, 1200);
        } else {
          setNotification(`❌ Submission failed: ${data.error}`);
        }
      } catch (err) {
        console.error(err);
        setNotification("❌ Submission failed");
      }
    };
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-start px-4 py-10 sm:px-6 md:px-10 lg:px-16 font-sans">

      {/* Notification Modal */}
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className={`bg-white border-2 border-red-600 rounded-2xl p-8 shadow-2xl max-w-md w-full text-center relative`}>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">{notification}</p>
            <button
              onClick={() => setNotification(null)}
              className="absolute top-4 right-4 text-black hover:text-gray-800 font-bold text-lg"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="mb-10 max-w-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 drop-shadow-md">
          DigiLocker KYC
        </h1>
        <p className="mt-3 text-gray-700 text-base sm:text-lg max-w-prose mx-auto leading-relaxed">
          Upload your DigiLocker document securely. You will be redirected to the official portal after submission.
        </p>
      </header>

      {/* File Upload Card */}
      <section className="max-w-lg w-full space-y-6">
        <div className="rounded-2xl border border-blue-200 bg-white p-8 shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Upload Document</h2>

          {/* Preview */}
          {preview && (
            <div className="mb-4 text-center">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto rounded-lg border border-gray-300 max-h-60 object-contain"
              />
              <p className="text-sm text-gray-500 mt-2">{file?.name}</p>
              <button
                onClick={() => { setFile(null); setPreview(null); }}
                className="mt-2 px-4 py-2 border border-gray-400 text-black rounded-md hover:bg-gray-100"
              >
                Retake
              </button>
            </div>
          )}

          {/* File input */}
          {!preview && (
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="block w-full text-sm bg-white text-gray-900 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={handleUpload}
              className="h-12 px-6 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              onClick={() => router.push("/")}
              className="h-12 px-6 rounded-lg border border-gray-400 bg-white text-black hover:bg-gray-100 shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
