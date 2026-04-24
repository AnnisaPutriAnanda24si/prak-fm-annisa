export default function OrderModal({ isOpen, onClose }) {
    if (!isOpen) return null; // Jika isOpen false, jangan render apa-apa

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Add New Order</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                        <input type="text" className="w-full border border-gray-200 rounded-lg p-2 outline-none focus:ring-2 focus:ring-hijau/20 focus:border-hijau" placeholder="Enter name..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order Details</label>
                        <textarea className="w-full border border-gray-200 rounded-lg p-2 outline-none focus:ring-2 focus:ring-hijau/20 focus:border-hijau" placeholder="What are they buying?"></textarea>
                    </div>
                </div>

                <div className="mt-6 flex space-x-3">
                    <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">
                        Cancel
                    </button>
                    <button className="flex-1 px-4 py-2 bg-hijau text-white rounded-lg hover:opacity-90 font-medium shadow-lg shadow-hijau/30">
                        Save Order
                    </button>
                </div>
            </div>
        </div>
    );
}