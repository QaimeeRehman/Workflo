import CustomersActions from "./CustomersActions";

function CustomerTableRow() {
  return (
    <tr className="border-t hover:bg-slate-50">
      <td className="px-6 py-4">1</td>
      <td className="px-6 py-4 font-medium">Ahmed Store</td>
      <td className="px-6 py-4">03001234567</td>
      <td className="px-6 py-4">Wholesale</td>
      <td className="px-6 py-4">Filer</td>
      <td className="px-6 py-4">Market</td>
      <CustomersActions />
    </tr>
  );
}

export default CustomerTableRow;
