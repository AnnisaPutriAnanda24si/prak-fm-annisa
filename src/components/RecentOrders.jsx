import { FaEllipsisV } from "react-icons/fa";

export default function RecentOrders() {
    const orders = [
        { order_number: "#00121", customer: "Annisa Putri Ananda", items: "Nasi Goreng Spesial", price: "Rp. 25.000", status: "Delivered" },
        { order_number: "#00122", customer: "Deswita", items: "Ayam Bakar Madu", price: "Rp. 35.000", status: "On Process" },
        { order_number: "#00123", customer: "Cheeryl Natania Queen", items: "Es Teh Manis", price: "Rp. 5.000", status: "Canceled" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                <button className="text-green-500 font-semibold hover:underline text-sm">View All</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-sm uppercase">
                            {/* Berubah dari Order ID menjadi Order Number */}
                            <th className="pb-4 font-medium">Order Number</th>
                            <th className="pb-4 font-medium">Customer</th>
                            <th className="pb-4 font-medium">Items</th>
                            <th className="pb-4 font-medium">Price</th>
                            <th className="pb-4 font-medium">Status</th>
                            <th className="pb-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                                {/* Menggunakan order_number */}
                                <td className="py-4 font-bold text-gray-700">{order.order_number}</td>
                                <td className="py-4 text-gray-600">{order.customer}</td>
                                <td className="py-4 text-gray-600">{order.items}</td>
                                <td className="py-4 font-semibold text-gray-800">{order.price}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                                          order.status === 'On Process' ? 'bg-blue-100 text-blue-600' : 
                                          'bg-red-100 text-red-600'}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-4 text-gray-400 cursor-pointer text-center group-hover:text-gray-600 transition-colors">
                                    <FaEllipsisV />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}