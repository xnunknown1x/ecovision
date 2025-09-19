"use client";
import { useRef, useState } from "react";

export default function UploadWaste() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect if mobile
  const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
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
              <img src={preview} alt="Preview" className="mt-4 rounded-lg shadow w-full object-cover max-h-64" />
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
              <img src={preview} alt="Preview" className="mt-4 rounded-lg shadow w-full object-cover max-h-64" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
