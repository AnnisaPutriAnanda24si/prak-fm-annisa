import { FaUsers, FaUserCheck, FaUserPlus } from "react-icons/fa";
import PageHeader from "../components/pageHeader";

export default function Customers() {
    return (
        <div id="customers-container">
            <PageHeader />
            <div id="customers-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <p>Ini adalah halaman customer</p>
                {/* Total Customers */}
                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-biru rounded-full p-4 text-3xl text-white">
                        <FaUsers />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">1,250</span>
                        <span className="text-gray-400">Total Customers</span>
                    </div>
                </div>

                {/* Active Customers */}
                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-hijau rounded-full p-4 text-3xl text-white">
                        <FaUserCheck />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">890</span>
                        <span className="text-gray-400">Active Members</span>
                    </div>
                </div>

                {/* New Customers (This Month) */}
                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-kuning rounded-full p-4 text-3xl text-white">
                        <FaUserPlus />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">45</span>
                        <span className="text-gray-400">New This Month</span>
                    </div>
                </div>

            </div>
            
            <div className="px-5 pb-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Customer List</h2>
                    <p className="text-gray-500 italic">Daftar pelanggan akan muncul di sini...</p>
                </div>
            </div>
        </div>
    );
}