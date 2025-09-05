"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FaceVerificationPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [captured, setCaptured] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; message: string; type: "success" | "error" }>({ show: false, message: "", type: "success" });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const docType = "face";
  const idNumber = "N/A";

  // Start camera
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("❌ Camera access denied:", err);
      showPopup("❌ Please allow camera access to capture your face", "error");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Capture image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 320, 240);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setImageData(dataUrl);
        setCaptured(true);
        stopCamera();

        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => setFile(new File([blob], "face.png", { type: "image/png" })));
      }
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setCaptured(false);
    setImageData(null);
    setFile(null);
    setSubmitted(false);
    startCamera();
  };

  // Upload
  const handleUpload = async () => {
    if (!file) {
      showPopup("⚠️ Please capture your face first", "error");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result as string;

      try {
        const res = await fetch("/api/face", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Test User",
            documentType: docType,
            idNumber: idNumber,
            fileName: file.name,
            fileData: base64data,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          showPopup("✅ Face submitted successfully!", "success");
          setSubmitted(true);
        } else {
          showPopup(`❌ Submission failed: ${data.error}`, "error");
        }
      } catch (err) {
        console.error(err);
        showPopup("❌ Submission failed", "error");
      }
    };
  };

  const showPopup = (message: string, type: "success" | "error") => {
    setPopup({ show: true, message, type });
  };

  // Stop camera on unmount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-16 relative">
      {/* Header */}
      <header className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-2 drop-shadow-md">Face Verification</h1>
        <p className="text-gray-700 sm:text-lg max-w-xl mx-auto leading-relaxed">
          Capture your face for secure authentication.
        </p>
      </header>

      {/* Camera / Captured Image */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full flex flex-col items-center">
        {!captured && !submitted && (
          <>
            <video ref={videoRef} width={320} height={240} autoPlay className="rounded-lg border-2 border-green-300" />
            <canvas ref={canvasRef} width={320} height={240} className="hidden" />
            <p className="text-gray-600 mt-3">📷 Align your face within the frame</p>
            <div className="flex gap-4 mt-4">
              <button onClick={captureImage} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
                Capture
              </button>
              <button onClick={() => { stopCamera(); router.push("/"); }} className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition">
                Back
              </button>
            </div>
          </>
        )}

        {/* After capture before submit */}
        {captured && !submitted && imageData && (
          <div className="text-center w-full">
            <p className="mb-4 text-green-700 font-semibold text-lg">✅ Captured!</p>
            <img src={imageData} alt="Captured Face" className="border-2 border-green-300 rounded-lg mx-auto" width={320} height={240} />
            <div className="flex gap-4 justify-center mt-4">
              <button onClick={retakePhoto} className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition">
                Retake
              </button>
              <button onClick={handleUpload} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
                Submit
              </button>
              <button onClick={() => { stopCamera(); router.push("/"); }} className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition">
                Close
              </button>
            </div>
          </div>
        )}

        {/* After submission */}
        {submitted && imageData && (
          <div className="text-center w-full">
            <p className="mb-4 text-green-700 font-semibold text-lg">✅ Submitted!</p>
            <img src={imageData} alt="Submitted Face" className="border-2 border-green-300 rounded-lg mx-auto" width={320} height={240} />
            <div className="flex gap-4 justify-center mt-4">
              <button onClick={retakePhoto} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
                Capture
              </button>
              <button onClick={() => { stopCamera(); router.push("/"); }} className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition">
                Back
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
          <div className={`bg-white border-2 ${popup.type === "success" ? "border-green-600" : "border-red-600"} rounded-2xl p-8 max-w-lg w-full shadow-2xl`}>
            <p className={`text-center font-bold text-lg ${popup.type === "success" ? "text-green-600" : "text-red-600"} mb-6`}>
              {popup.message}
            </p>
            <div className="text-center">
              <button onClick={() => setPopup({ ...popup, show: false })} className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 transition font-semibold text-black">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
