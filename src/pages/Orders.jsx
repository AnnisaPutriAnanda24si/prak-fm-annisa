import { FaBox, FaClock, FaCheckCircle } from "react-icons/fa";
import PageHeader from "../components/pageHeader";
import OrdersTable from "../components/OrdersTable";

export default function Orders() {
    return (
        <div id="orders-container">
<PageHeader
    title="Orders"
    breadcrumb="Dashboard / Orders"
    buttonLabel="+ Add New Order"
    modalTitle="Add New Order"
    modalContent={
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                <input type="text" className="w-full border rounded-lg p-2 outline-none focus:border-hijau" placeholder="#ORD-000" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input type="text" className="w-full border rounded-lg p-2 outline-none focus:border-hijau" placeholder="Enter customer name" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full border rounded-lg p-2 outline-none focus:border-hijau">
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
                <input type="number" className="w-full border rounded-lg p-2 outline-none focus:border-hijau" placeholder="125000" />
            </div>
        </>
    }
/>
            {/* Panggil tabelnya di sini */}
            <OrdersTable />
        </div>
    );
}