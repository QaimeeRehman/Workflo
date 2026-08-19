import CustomerTableRow from "./CustomerTableRow";

function CustomerTable({ customers, customerBalances }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.12)]">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Customer
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Phone
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Sale Type
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Tax
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Area
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Outstanding
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <CustomerTableRow
              customerBalances={customerBalances}
              customer={customer}
              key={customer.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
