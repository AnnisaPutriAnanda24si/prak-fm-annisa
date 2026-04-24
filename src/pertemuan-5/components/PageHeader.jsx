import { useState } from "react";
import OrderModal from "./OrderModal";
export default function PageHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    Dashboard
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-gray-500">Dashboard</span>
                    <span id="breadcrumb-separator" className="text-gray-500">/</span>
                    <span id="breadcrumb-current" className="text-gray-500">Order List</span>
                </div>
            </div>
            <div id="action-button">
                {/* Trigger klik untuk membuka modal */}
                <button
                    id="add-button"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-hijau text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-hijau/30 hover:scale-105 active:scale-95 transition-all"
                >
                    + Add New Order
                </button>
            </div>
            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}