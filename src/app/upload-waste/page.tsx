"use client";
import { useRef, useState } from "react";
import wasteCategories from "../api/check-waste/waste-categories.json";
import Image from "next/image";

export default function UploadWaste() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string | null>(null);
  const [impact, setImpact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);
  
  // Detect if mobile
  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"];
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!validImageTypes.includes(file.type)) {
        setFileError("Only image files (jpg, png, webp, gif, bmp,) are allowed.");
        setPreview(null);
        fileRef.current = null;
        setResult(null);
        setInstructions(null);
        setImpact(null);
        return;
      }
      setFileError(null);
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
      if (!validImageTypes.includes(file.type)) {
        setFileError("Only image files (jpg, png, webp, gif, bmp) are allowed.");
        setPreview(null);
        fileRef.current = null;
        setResult(null);
        setInstructions(null);
        setImpact(null);
        return;
      }
      setFileError(null);
      setPreview(URL.createObjectURL(file));
      fileRef.current = file;
      setResult(null);
    }
  };

  const handleCheckWaste = async () => {
    if (!fileRef.current) return;
    setLoading(true);
    setResult(null);
  setInstructions(null);
  setImpact(null);
    const formData = new FormData();
    formData.append("file", fileRef.current);
    try {
      const res = await fetch("/api/check-waste", {
        method: "POST",
        body: formData,
      });
      type ApiResponse = { result?: string; error?: string };
      const data: ApiResponse = await res.json();
      const answer = data.result || data.error || "No result";
      setResult(answer);
      // Find instructions for the detected category
      const match = wasteCategories.find(
        (cat) => cat.category.toLowerCase() === answer.trim().toLowerCase()
      );
      setInstructions(match ? match.description : null);
      setImpact(match ? match.environmentalImpact : null);
    } catch {
      setResult("Error checking waste");
  setInstructions(null);
  setImpact(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setResult(null);
    setInstructions(null);
    setImpact(null);
    setFileError(null);
    fileRef.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Upload Your Waste Photo</h1>
      <div className="w-full max-w-md">
        {isMobile ? (
          <div className="flex flex-col items-center gap-4">
            {fileError && (
              <div className="mb-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm font-semibold">{fileError}</div>
            )}
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
                    <div className="mt-4 p-4 bg-white rounded shadow text-black font-mono font-bold text-2xl tracking-wide">Waste Type: {result}</div>
                    {instructions && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded text-green-900 text-base font-sans">{instructions}</div>
                    )}
                    {impact && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-base font-sans font-semibold">{impact}</div>
                    )}
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
            {fileError && (
              <div className="mb-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm font-semibold">{fileError}</div>
            )}
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
                    <div className="mt-4 p-4 bg-white rounded shadow text-black font-mono font-bold text-2xl tracking-wide"><span style={{fontSize:"1.4rem",color:"red"}}>Waste Type:</span>{result}</div>
                    {instructions && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded text-green-900 text-base font-sans">{instructions}</div>
                    )}
                    {impact && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-base font-sans font-semibold">{impact}</div>
                    )}
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
