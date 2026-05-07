import { FaBox, FaClock, FaCheckCircle } from "react-icons/fa";
import PageHeader from "../components/pageHeader";

export default function Orders() {
    return (
        <div id="orders-container">
            <PageHeader />
            <div id="orders-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <p>Ini adalah halamaan order</p>
                {/* All Orders */}
                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-biru rounded-full p-4 text-3xl text-white">
                        <FaBox />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">432</span>
                        <span className="text-gray-400">All Time Orders</span>
                    </div>
                </div>

                {/* Pending Orders */}
                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-kuning rounded-full p-4 text-3xl text-white">
                        <FaClock />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">12</span>
                        <span className="text-gray-400">Pending Processing</span>
                    </div>
                </div>

                {/* Completed Orders */}
                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-hijau rounded-full p-4 text-3xl text-white">
                        <FaCheckCircle />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">380</span>
                        <span className="text-gray-400">Completed</span>
                    </div>
                </div>

            </div>

            <div className="px-5 pb-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Order Management</h2>
                    <p className="text-gray-500 italic">Tabel manajemen pesanan akan muncul di sini...</p>
                </div>
            </div>
        </div>
    );
}