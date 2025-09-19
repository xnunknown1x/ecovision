"use client";
import { useRef, useState } from "react";

export default function UploadWaste() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);

  // Detect if mobile
  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      fileRef.current = file;
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      fileRef.current = file;
      setResult(null);
    }
  };

  const handleCheckWaste = async () => {
    if (!fileRef.current) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("file", fileRef.current);
    try {
      const res = await fetch("/api/check-waste", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.result || data.error || "No result");
    } catch (e) {
      setResult("Error checking waste");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Upload Your Waste Photo</h1>
      <div className="w-full max-w-md">
        {isMobile ? (
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full text-lg shadow transition"
              onClick={() => inputRef.current?.click()}
            >
              Upload Photo
            </button>
            {preview && (
              <>
                <img src={preview} alt="Preview" className="mt-4 rounded-lg shadow w-full object-cover max-h-64" />
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full text-base shadow transition disabled:opacity-60"
                  onClick={handleCheckWaste}
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Check Waste Type"}
                </button>
                {result && (
                  <div className="mt-4 p-4 bg-white rounded shadow text-green-700 font-bold text-lg">{result}</div>
                )}
              </>
            )}
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition ${dragActive ? "border-green-600 bg-green-50" : "border-green-300 bg-white"}`}
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
            onDrop={handleDrop}
            style={{ minHeight: 220 }}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <p className="text-gray-600 mb-2">Drag & drop your waste photo here</p>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full text-base shadow transition"
              onClick={() => inputRef.current?.click()}
            >
              Or select a file
            </button>
            {preview && (
              <>
                <img src={preview} alt="Preview" className="mt-4 rounded-lg shadow w-full object-cover max-h-64" />
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full text-base shadow transition disabled:opacity-60"
                  onClick={handleCheckWaste}
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Check Waste Type"}
                </button>
                {result && (
                  <div className="mt-4 p-4 bg-white rounded shadow text-green-700 font-bold text-lg">{result}</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
