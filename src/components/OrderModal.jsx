
export default function OrderModal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                        {title || "Modal Title"} {/* Judul Dinamis */}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                
                {/* 2. DISINI TEMPAT ISINYA MUNCUL! */}
                <div className="space-y-4">
                    {children} 
                </div>

                <div className="mt-6 flex space-x-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
                        Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-hijau text-white rounded-lg hover:opacity-90 font-medium shadow-lg shadow-hijau/30">
                        Save Data
                    </button>
                </div>
            </div>
        </div>
    );
}