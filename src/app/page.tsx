import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center flex-1 text-center py-20 px-4 bg-gradient-to-b from-green-200/80 to-white overflow-hidden">
        {/* Left Leaves */}
        <Image src="/Leaves.png" width={200} height={200} alt="Leaves Left" className="hidden md:block absolute left-0 top-10 md:top-1/4 w-40 h-40 opacity-70 pointer-events-none select-none" style={{zIndex:0}} />
        {/* Right Leaves */}
        <Image src="/Leaves.png" width={200} height={200} alt="Leaves Right" className="hidden md:block absolute right-0 bottom-10 md:bottom-1/4 w-40 h-40 opacity-70 pointer-events-none select-none transform scale-x-[-1]" style={{zIndex:0}} />
          {/* Curve SVG Background */}
          {/* <Image src="/Curves.svg" fill alt="Curve Background" className="absolute left-0 top-0 w-full h-full object-cover pointer-events-none select-none" /> */}
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center">
          <Image src={"/EcoVisionLogo.png"} width={200} height={200} alt="Hero"/>
          <h1 className="text-6xl font-extrabold text-green-800 mb-4 drop-shadow">EcoVision</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-green-600 mb-8">Empowering a Greener Tomorrow</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
            Revolutionizing waste management for a cleaner, greener planet. Upload your waste, find the nearest eco-friendly dumping site, and join a community making a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg transition">Upload Waste</button>
            <button className="bg-white border border-green-600 hover:bg-green-50 text-green-700 font-bold py-3 px-10 rounded-full text-lg shadow-lg transition">Find Nearest Location</button>
          </div>
        </div>
      </section>

      {/* Inspiring Lines Section */}
      <section className="w-full py-12 px-4 bg-white/80 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-green-700 mb-4">Why Choose EcoVision?</h3>
        <ul className="text-lg text-gray-700 max-w-2xl mx-auto space-y-3">
          <li><span className="font-semibold">Reduce, Reuse, Recycle:</span> Every action counts toward a sustainable future.</li>
          <li><span className="font-semibold">Easy Waste Disposal:</span> Upload, locate, and dispose—it's that simple.</li>
          <li><span className="font-semibold">Community Impact:</span> Join hands with others to keep our environment clean.</li>
          <li><span className="font-semibold">Track Your Contribution:</span> See the difference you make, one upload at a time.</li>
        </ul>
      </section>

      {/* Waste Classification Section */}
      <section className="w-full py-16 px-4 bg-green-100/60 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-green-800 mb-8">Waste Classification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Organic Waste */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">🍃</span>
            </div>
            <h4 className="text-xl font-semibold text-green-700 mb-2">Organic Waste</h4>
            <ul className="text-gray-700 text-left text-base mb-2 list-disc list-inside">
              <li>Food waste</li>
              <li>Garden/green waste</li>
            </ul>
          </div>
          {/* Recyclable Waste */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">♻️</span>
            </div>
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Recyclable Waste</h4>
            <ul className="text-gray-700 text-left text-base mb-2 list-disc list-inside">
              <li>Paper &amp; Cardboard</li>
              <li>Plastics (PET bottles, packaging, etc.)</li>
              <li>Metals (cans, aluminum foil)</li>
              <li>Glass</li>
            </ul>
          </div>
          {/* E-Waste */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">💻</span>
            </div>
            <h4 className="text-xl font-semibold text-yellow-700 mb-2">E-Waste</h4>
            <ul className="text-gray-700 text-left text-base mb-2 list-disc list-inside">
              <li>Small electronics (phones, chargers)</li>
              <li>Batteries</li>
            </ul>
          </div>
          {/* Hazardous Waste */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-red-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">⚠️</span>
            </div>
            <h4 className="text-xl font-semibold text-red-700 mb-2">Hazardous Waste</h4>
            <ul className="text-gray-700 text-left text-base mb-2 list-disc list-inside">
              <li>Medical/biomedical (syringes, bandages)</li>
              <li>Chemical (paints, pesticides)</li>
              <li>Radioactive (if included in advanced version)</li>
            </ul>
          </div>
          {/* Construction & Demolition */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">🏗️</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">Construction &amp; Demolition</h4>
            <ul className="text-gray-700 text-left text-base mb-2 list-disc list-inside">
              <li>Concrete, bricks, tiles, wood</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto py-6 text-center text-gray-500 text-sm bg-green-50 border-t border-green-100">
        &copy; {new Date().getFullYear()} EcoVision. All rights reserved.
      </footer>
    </div>
  );
}
