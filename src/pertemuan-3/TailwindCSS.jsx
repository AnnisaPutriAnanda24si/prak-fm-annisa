export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation - Tetap di atas */}
      <FlexboxGrid />

      <main className="max-w-6xl mx-auto p-6 lg:p-12">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black text-blue-900 leading-tight">
              Kuasai <span className="text-orange-500">Tailwind CSS</span> dengan Cepat
            </h1>
            <p className="text-gray-600 text-lg mt-4">
              Eksplorasi komponen interaktif dan styling modern tanpa meninggalkan kenyamanan utility-first CSS.
            </p>
          </div>
          <button className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95">
            Mulai Belajar
          </button>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Spacing & Card Style */}
          <div className="lg:col-span-2">
            <Spacing />
          </div>

          {/* Card 2: Typography Focus */}
          <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
             <Typography />
          </div>

          {/* Card 3: Interactive Border */}
          <div className="flex items-center justify-center bg-blue-50 rounded-3xl p-8 border-2 border-dashed border-blue-200">
            <div className="text-center">
               <p className="text-sm text-blue-400 mb-4 font-mono font-bold uppercase tracking-widest">Custom Border</p>
               <BorderRadius />
            </div>
          </div>

          {/* Card 4 & 5: Combined Visual Sections */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-0 overflow-hidden rounded-3xl shadow-2xl">
             <BackgroundColors />
             <ShadowEffects />
          </div>

        </div>
      </main>
    </div>
  );
}

function FlexboxGrid() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-900/95 backdrop-blur-md text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg rotate-12"></div>
          <span className="text-xl font-bold tracking-tighter">TW.DEV</span>
        </div>
        <ul className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide">
          <li><a href="#" className="text-orange-400 border-b-2 border-orange-400 pb-1">Learning</a></li>
          <li><a href="#" className="hover:text-orange-400 transition">Components</a></li>
          <li><a href="#" className="hover:text-orange-400 transition">Showcase</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Spacing() {
  return (
    <div className="h-full bg-blue-600 p-10 rounded-3xl flex flex-col justify-end relative overflow-hidden group">
      {/* Dekorasi Background */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">Spacing & Box Model</h2>
        <p className="text-blue-100 text-lg leading-relaxed">
          Mengatur ritme visual dengan margin dan padding yang konsisten untuk menciptakan kenyamanan membaca.
        </p>
      </div>
    </div>
  );
}

function Typography() {
  return (
    <div className="p-6">
      <div className="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
        <span className="text-orange-600 font-bold text-xl">Aa</span>
      </div>
      <h1 className="text-2xl font-black text-blue-800">Typography</h1>
      <p className="text-gray-500 mt-4 leading-relaxed">
        Gunakan <span className="font-bold text-blue-600 italic">font-weight</span> dan <span className="text-orange-500 underline underline-offset-4">tracking</span> untuk memberi karakter pada teks Anda.
      </p>
    </div>
  );
}

function BorderRadius() {
  return (
    <button className="group relative px-8 py-3 font-bold text-blue-600 transition-all duration-300">
      <span className="absolute inset-0 border-2 border-orange-400 rounded-tl-2xl rounded-br-2xl group-hover:rounded-2xl transition-all duration-300"></span>
      <span className="relative">Ubah Radius</span>
    </button>
  );
}

function BackgroundColors() {
  return (
    <div className="bg-blue-500 p-10 text-white flex flex-col justify-center">
      <h3 className="text-orange-300 text-2xl font-black uppercase tracking-widest mb-4">Vibrant</h3>
      <p className="text-blue-50 opacity-80">Warna primer biru yang solid memberikan kesan profesional dan stabil.</p>
    </div>
  );
}

function ShadowEffects() {
  return (
    <div className="bg-orange-400 p-10 flex flex-col justify-center cursor-pointer group transition-colors duration-300 hover:bg-orange-500">
      <h3 className="text-blue-900 text-2xl font-black mb-2">Shadows</h3>
      <p className="text-blue-900/60 font-medium group-hover:text-white transition-colors">
        Hover untuk melihat bagaimana elevasi bayangan berubah secara dinamis.
      </p>
    </div>
  );
}