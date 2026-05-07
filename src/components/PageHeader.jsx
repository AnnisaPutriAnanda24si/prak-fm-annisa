import { useState } from "react";
import OrderModal from "./OrderModal";

export default function PageHeader({ title, breadcrumb, children, buttonLabel, modalTitle, modalContent  }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {title} {/* <--- Ganti Dashboard jadi ini */}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-gray-500">
                        {breadcrumb} {/* <--- Ganti Dashboard / Order List jadi ini */}
                    </span>
                </div>
            </div>
            <div id="action-button" className="flex items-center space-x-2">
                {children} {/* <--- Slot buat kalau mau nambah tombol lain */}
                
<button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-hijau text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-hijau/30 hover:scale-105 active:scale-95 transition-all"
                >
                    {/* Pakai props buttonLabel supaya teks tombol bisa berubah */}
                    {buttonLabel || "+ Add New"} 
                </button>
            </div>

<OrderModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title={modalTitle}
>
    {/* modalContent HARUS di antara tag pembuka dan penutup OrderModal */}
    {modalContent} 
</OrderModal>
        </div>
    );
}