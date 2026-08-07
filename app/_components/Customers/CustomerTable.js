import CustomersActions from "./CustomersActions";
import CustomerTableRow from "./CustomerTableRow";

function CustomerTable() {
  return (
    <table className="w-full">
      <thead className="bg-slate-100">
        <tr>
          <th className="px-6 py-4 text-left">ID</th>
          <th className="px-6 py-4 text-left">Customer</th>
          <th className="px-6 py-4 text-left">Phone</th>
          <th className="px-6 py-4 text-left">Sale Type</th>
          <th className="px-6 py-4 text-left">Tax</th>
          <th className="px-6 py-4 text-left">Area</th>
          <th className="px-6 py-4 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <CustomerTableRow />
      </tbody>
    </table>
  );
}

export default CustomerTable;
