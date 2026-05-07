import { FaUsers, FaUserCheck, FaUserPlus } from "react-icons/fa";
import PageHeader from "../components/pageHeader";
import CustomersTable from "../components/CustomersTable";

export default function Customers() {
    return (
        <div id="customer-container"
            className="p-6 space-y-6">
            <PageHeader
                title="Customers"
                breadcrumb="Dashboard / Customers"
                buttonLabel="+ Add Customer"
                modalTitle="Add New Customer"
                modalContent={
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                            <input type="text" className="w-full border rounded-lg p-2" placeholder="Full Name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full border rounded-lg p-2" placeholder="email@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loyalty Level</label>
                            <select className="w-full border rounded-lg p-2">
                                <option>Bronze</option>
                                <option>Silver</option>
                                <option>Gold</option>
                            </select>
                        </div>
                    </>
                }
            />
            {/* Panggil tabelnya di sini */}
            <CustomersTable />
        </div>
    );
}