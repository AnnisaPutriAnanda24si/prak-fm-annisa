import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-5">
      {/* Icon Error */}
      <div className="text-hijau text-9xl mb-5 opacity-20">
        <FaExclamationTriangle />
      </div>
      
      <h1 className="text-6xl font-black text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-600 mb-4">Waduh! Halaman Tidak Ditemukan</h2>
      
      <p className="text-gray-500 max-w-md mb-8">
        Sepertinya kamu tersesat. Halaman yang kamu cari tidak ada atau mungkin sudah pindah ke alamat lain.
      </p>

      {/* Tombol Kembali */}
      <Link 
        to="/" 
        className="flex items-center space-x-2 bg-hijau text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-600 transition-all active:scale-95"
      >
        <FaHome />
        <span>Kembali ke Dashboard</span>
      </Link>
    </div>
  );
}