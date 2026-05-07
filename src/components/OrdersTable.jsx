import React from 'react';

const ordersData = [
  { "orderId": "#ORD-001", "customerName": "Annisa Putri Ananda", "status": "Completed", "totalPrice": 125000, "orderDate": "2024-05-01" },
  { "orderId": "#ORD-002", "customerName": "Budi Santoso", "status": "Pending", "totalPrice": 45000, "orderDate": "2024-05-02" },
  { "orderId": "#ORD-003", "customerName": "Cheeryl Natania Queen", "status": "Cancelled", "totalPrice": 75000, "orderDate": "2024-05-02" },
  { "orderId": "#ORD-004", "customerName": "Deswita Maharani", "status": "Completed", "totalPrice": 210000, "orderDate": "2024-05-03" },
  { "orderId": "#ORD-005", "customerName": "Eko Prasetyo", "status": "Pending", "totalPrice": 15000, "orderDate": "2024-05-03" },
  { "orderId": "#ORD-006", "customerName": "Fani Rahmawati", "status": "Completed", "totalPrice": 88000, "orderDate": "2024-05-04" },
  { "orderId": "#ORD-007", "customerName": "Guntur Wijaya", "status": "Completed", "totalPrice": 500000, "orderDate": "2024-05-04" },
  { "orderId": "#ORD-008", "customerName": "Hana Pertiwi", "status": "Cancelled", "totalPrice": 32000, "orderDate": "2024-05-05" },
  { "orderId": "#ORD-009", "customerName": "Indra Kusuma", "status": "Completed", "totalPrice": 120000, "orderDate": "2024-05-05" },
  { "orderId": "#ORD-010", "customerName": "Joko Susilo", "status": "Pending", "totalPrice": 95000, "orderDate": "2024-05-06" },
  { "orderId": "#ORD-011", "customerName": "Karin Amelia", "status": "Completed", "totalPrice": 250000, "orderDate": "2024-05-06" },
  { "orderId": "#ORD-012", "customerName": "Lutfi Hakim", "status": "Completed", "totalPrice": 67000, "orderDate": "2024-05-07" },
  { "orderId": "#ORD-013", "customerName": "Maya Indah", "status": "Cancelled", "totalPrice": 110000, "orderDate": "2024-05-07" },
  { "orderId": "#ORD-014", "customerName": "Niko Ardiansyah", "status": "Pending", "totalPrice": 45000, "orderDate": "2024-05-08" },
  { "orderId": "#ORD-015", "customerName": "Olivia Zalianty", "status": "Completed", "totalPrice": 300000, "orderDate": "2024-05-08" },
  { "orderId": "#ORD-016", "customerName": "Putra Pratama", "status": "Completed", "totalPrice": 55000, "orderDate": "2024-05-09" },
  { "orderId": "#ORD-017", "customerName": "Qori Sandiva", "status": "Pending", "totalPrice": 82000, "orderDate": "2024-05-09" },
  { "orderId": "#ORD-018", "customerName": "Rian Hidayat", "status": "Completed", "totalPrice": 145000, "orderDate": "2024-05-10" },
  { "orderId": "#ORD-019", "customerName": "Siska Putri", "status": "Cancelled", "totalPrice": 20000, "orderDate": "2024-05-10" },
  { "orderId": "#ORD-020", "customerName": "Taufik Ismail", "status": "Completed", "totalPrice": 175000, "orderDate": "2024-05-11" },
  { "orderId": "#ORD-021", "customerName": "Umar Bakri", "status": "Pending", "totalPrice": 33000, "orderDate": "2024-05-11" },
  { "orderId": "#ORD-022", "customerName": "Vina Panduwinata", "status": "Completed", "totalPrice": 90000, "orderDate": "2024-05-12" },
  { "orderId": "#ORD-023", "customerName": "Wawan Setiawan", "status": "Completed", "totalPrice": 125000, "orderDate": "2024-05-12" },
  { "orderId": "#ORD-024", "customerName": "Xena Hermawan", "status": "Cancelled", "totalPrice": 400000, "orderDate": "2024-05-13" },
  { "orderId": "#ORD-025", "customerName": "Yanto Subagio", "status": "Pending", "totalPrice": 52000, "orderDate": "2024-05-13" },
  { "orderId": "#ORD-026", "customerName": "Zaskia Gotik", "status": "Completed", "totalPrice": 215000, "orderDate": "2024-05-14" },
  { "orderId": "#ORD-027", "customerName": "Ahmad Dhani", "status": "Completed", "totalPrice": 75000, "orderDate": "2024-05-14" },
  { "orderId": "#ORD-028", "customerName": "Bella Shofie", "status": "Pending", "totalPrice": 110000, "orderDate": "2024-05-15" },
  { "orderId": "#ORD-029", "customerName": "Cakra Khan", "status": "Completed", "totalPrice": 85000, "orderDate": "2024-05-15" },
  { "orderId": "#ORD-030", "customerName": "Deddy Corbuzier", "status": "Completed", "totalPrice": 600000, "orderDate": "2024-05-16" }
];

export default function OrdersTable() {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-600';
      case 'Pending': return 'bg-blue-100 text-blue-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-[30px] p-6 shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 uppercase text-sm border-b">
            <th className="pb-4 font-semibold">Order ID</th>
            <th className="pb-4 font-semibold">Customer Name</th>
            <th className="pb-4 font-semibold">Status</th>
            <th className="pb-4 font-semibold">Total Price</th>
            <th className="pb-4 font-semibold">Order Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {ordersData.map((order, index) => (
            <tr key={index} className="border-b last:border-none hover:bg-gray-50 transition-colors">
              <td className="py-4 font-bold">{order.orderId}</td>
              <td className="py-4">{order.customerName}</td>
              <td className="py-4">
                <span className={`px-4 py-1.5 rounded-xl text-xs font-bold ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="py-4 font-semibold">Rp. {order.totalPrice.toLocaleString('id-ID')}</td>
              <td className="py-4 text-gray-500">{order.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}