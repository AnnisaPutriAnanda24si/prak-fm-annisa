import { Link } from "react-router-dom";

export default function ErrorPage({ errorCode, errorTitle, description, errorIcon }) {
  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-4">
      {/* Outer Container (White Box) */}
      <div className="bg-white w-full max-w-5xl rounded-[50px] p-10 md:p-20 flex flex-col md:flex-row items-center relative overflow-hidden shadow-sm">
        
        {/* Sisi Kiri (Teks) */}
        <div className="flex-1 z-10 text-center md:text-left">
          <h1 className="text-[#1A202C] text-5xl md:text-6xl font-extrabold mb-2">
            Ooops...
          </h1>
          <h2 className="text-[#1A202C] text-3xl md:text-5xl font-bold mb-6">
            {errorTitle}
          </h2>
          <p className="text-[#718096] text-lg mb-10 max-w-sm leading-relaxed">
            {description}
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center bg-[#FF5B5B] text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-red-500 transition-all shadow-lg shadow-red-200 group"
          >
            Go Back 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Sisi Kanan (Ikon & Nomor) */}
        <div className="flex-1 flex flex-col items-center justify-center relative mt-20 md:mt-0">
          {/* Angka Error di belakang (Sesuai Figma) */}
          <div className="absolute -top-10 md:-top-20 right-0 text-right">
            <h3 className="text-[#1A202C] text-8xl md:text-[150px] font-black leading-none opacity-90">
              {errorCode}
            </h3>
            <p className="text-[#718096] text-xl font-bold -mt-2 md:-mt-5">
              {errorTitle}
            </p>
          </div>
          
          {/* Ikon Pengganti Gambar */}
          <div className="text-[#FF5B5B] text-[200px] md:text-[250px] mt-10 opacity-90 relative z-0">
            {errorIcon}
          </div>
        </div>

      </div>
    </div>
  );
}