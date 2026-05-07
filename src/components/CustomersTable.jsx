import React from 'react';

const customersData = [
  { "customerId": "CUST-001", "name": "Annisa Putri Ananda", "email": "annisa@example.com", "phone": "081234567890", "loyalty": "Gold" },
  { "customerId": "CUST-002", "name": "Budi Santoso", "email": "budi.s@example.com", "phone": "081234567891", "loyalty": "Silver" },
  { "customerId": "CUST-003", "name": "Cheeryl Natania Queen", "email": "cheeryl@example.com", "phone": "081234567892", "loyalty": "Bronze" },
  { "customerId": "CUST-004", "name": "Deswita Maharani", "email": "deswita@example.com", "phone": "081234567893", "loyalty": "Gold" },
  { "customerId": "CUST-005", "name": "Eko Prasetyo", "email": "eko.p@example.com", "phone": "081234567894", "loyalty": "Bronze" },
  { "customerId": "CUST-006", "name": "Fani Rahmawati", "email": "fani@example.com", "phone": "081234567895", "loyalty": "Silver" },
  { "customerId": "CUST-007", "name": "Guntur Wijaya", "email": "guntur@example.com", "phone": "081234567896", "loyalty": "Gold" },
  { "customerId": "CUST-008", "name": "Hana Pertiwi", "email": "hana@example.com", "phone": "081234567897", "loyalty": "Bronze" },
  { "customerId": "CUST-009", "name": "Indra Kusuma", "email": "indra@example.com", "phone": "081234567898", "loyalty": "Silver" },
  { "customerId": "CUST-010", "name": "Joko Susilo", "email": "joko@example.com", "phone": "081234567899", "loyalty": "Bronze" },
  { "customerId": "CUST-011", "name": "Karin Amelia", "email": "karin@example.com", "phone": "081234567810", "loyalty": "Gold" },
  { "customerId": "CUST-012", "name": "Lutfi Hakim", "email": "lutfi@example.com", "phone": "081234567811", "loyalty": "Silver" },
  { "customerId": "CUST-013", "name": "Maya Indah", "email": "maya@example.com", "phone": "081234567812", "loyalty": "Bronze" },
  { "customerId": "CUST-014", "name": "Niko Ardiansyah", "email": "niko@example.com", "phone": "081234567813", "loyalty": "Silver" },
  { "customerId": "CUST-015", "name": "Olivia Zalianty", "email": "olivia@example.com", "phone": "081234567814", "loyalty": "Gold" },
  { "customerId": "CUST-016", "name": "Putra Pratama", "email": "putra@example.com", "phone": "081234567815", "loyalty": "Bronze" },
  { "customerId": "CUST-017", "name": "Qori Sandiva", "email": "qori@example.com", "phone": "081234567816", "loyalty": "Silver" },
  { "customerId": "CUST-018", "name": "Rian Hidayat", "email": "rian@example.com", "phone": "081234567817", "loyalty": "Gold" },
  { "customerId": "CUST-019", "name": "Siska Putri", "email": "siska@example.com", "phone": "081234567818", "loyalty": "Bronze" },
  { "customerId": "CUST-020", "name": "Taufik Ismail", "email": "taufik@example.com", "phone": "081234567819", "loyalty": "Silver" },
  { "customerId": "CUST-021", "name": "Umar Bakri", "email": "umar@example.com", "phone": "081234567820", "loyalty": "Bronze" },
  { "customerId": "CUST-022", "name": "Vina Panduwinata", "email": "vina@example.com", "phone": "081234567821", "loyalty": "Gold" },
  { "customerId": "CUST-023", "name": "Wawan Setiawan", "email": "wawan@example.com", "phone": "081234567822", "loyalty": "Silver" },
  { "customerId": "CUST-024", "name": "Xena Hermawan", "email": "xena@example.com", "phone": "081234567823", "loyalty": "Gold" },
  { "customerId": "CUST-025", "name": "Yanto Subagio", "email": "yanto@example.com", "phone": "081234567824", "loyalty": "Bronze" },
  { "customerId": "CUST-026", "name": "Zaskia Gotik", "email": "zaskia@example.com", "phone": "081234567825", "loyalty": "Silver" },
  { "customerId": "CUST-027", "name": "Ahmad Dhani", "email": "dhani@example.com", "phone": "081234567826", "loyalty": "Gold" },
  { "customerId": "CUST-028", "name": "Bella Shofie", "email": "bella@example.com", "phone": "081234567827", "loyalty": "Silver" },
  { "customerId": "CUST-029", "name": "Cakra Khan", "email": "cakra@example.com", "phone": "081234567828", "loyalty": "Bronze" },
  { "customerId": "CUST-030", "name": "Deddy Corbuzier", "email": "deddy@example.com", "phone": "081234567829", "loyalty": "Gold" }
];

export default function CustomersTable() {
  const getLoyaltyClass = (level) => {
    switch (level) {
      case 'Gold': return 'text-yellow-600 bg-yellow-50 border border-yellow-200';
      case 'Silver': return 'text-gray-500 bg-gray-50 border border-gray-200';
      case 'Bronze': return 'text-orange-600 bg-orange-50 border border-orange-200';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-[30px] p-6 shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-400 uppercase text-sm border-b">
            <th className="pb-4 font-semibold">ID</th>
            <th className="pb-4 font-semibold">Customer Name</th>
            <th className="pb-4 font-semibold">Email</th>
            <th className="pb-4 font-semibold">Phone</th>
            <th className="pb-4 font-semibold">Loyalty</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {customersData.map((customer, index) => (
            <tr key={index} className="border-b last:border-none hover:bg-gray-50 transition-colors">
              <td className="py-4 text-gray-400 font-medium">{customer.customerId}</td>
              <td className="py-4 font-bold text-gray-800">{customer.name}</td>
              <td className="py-4 text-blue-500 italic underline decoration-blue-200">{customer.email}</td>
              <td className="py-4">{customer.phone}</td>
              <td className="py-4">
                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${getLoyaltyClass(customer.loyalty)}`}>
                  {customer.loyalty}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}