"use client";
import { useRef, useState } from "react";
import Image from "next/image";

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
      type ApiResponse = { result?: string; error?: string };
      const data: ApiResponse = await res.json();
      setResult(data.result || data.error || "No result");
    } catch {
      setResult("Error checking waste");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setResult(null);
    fileRef.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Upload Your Waste Photo</h1>
      <div className="w-full max-w-md">
        {isMobile ? (
          <div className="flex flex-col items-center gap-4">
            {!preview && !loading && (
              <>
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
              </>
            )}
            {preview && (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="mt-4 rounded-lg shadow w-full object-cover max-h-64"
                  style={{ width: '100%', height: 'auto', maxHeight: '16rem' }}
                  unoptimized
                />
                {!result && (
                  <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full text-base shadow transition disabled:opacity-60"
                    onClick={handleCheckWaste}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>Analyzing...</span>
                    ) : "Check Waste Type"}
                  </button>
                )}
                {loading && (
                  <div className="mt-4 flex justify-center"><span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600"></span></div>
                )}
                {result && (
                  <>
                    <div className="mt-4 p-4 bg-white rounded shadow text-black font-mono font-bold text-2xl tracking-wide">{result}</div>
                    <button
                      className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-full text-base shadow transition"
                      onClick={handleReset}
                    >
                      Check Another
                    </button>
                  </>
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
            {!preview && !loading && (
              <>
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
              </>
            )}
            {preview && (
              <>
                <Image
                  src={preview}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="mt-4 rounded-lg shadow w-full object-cover max-h-64"
                  style={{ width: '100%', height: 'auto', maxHeight: '16rem' }}
                  unoptimized
                />
                {!result && (
                  <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full text-base shadow transition disabled:opacity-60"
                    onClick={handleCheckWaste}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>Analyzing...</span>
                    ) : "Check Waste Type"}
                  </button>
                )}
                {loading && (
                  <div className="mt-4 flex justify-center"><span className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-600"></span></div>
                )}
                {result && (
                  <>
                    <div className="mt-4 p-4 bg-white rounded shadow text-black font-mono font-bold text-2xl tracking-wide">{result}</div>
                    <button
                      className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-full text-base shadow transition"
                      onClick={handleReset}
                    >
                      Check Another
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
