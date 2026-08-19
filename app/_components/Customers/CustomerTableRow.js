import { toCapitalize } from "@/app/_lib/helper";
import CustomersActions from "./CustomersActions";

async function CustomerTableRow({ customer, customerBalances }) {
  const { id, fullName, phone, saleType, taxCategory, area, cnic } = customer;
  const balances = customerBalances.get(id);
  return (
    <tr className="border-t hover:bg-slate-50">
      <td className="px-6 py-4 font-medium">{toCapitalize(fullName)}</td>
      <td className="px-6 py-4">{phone}</td>
      <td className="px-6 py-4">{toCapitalize(saleType)}</td>
      <td className="px-6 py-4">{toCapitalize(taxCategory)}</td>
      <td className="px-6 py-4">{toCapitalize(area)}</td>
      <td className="px-6 py-4">
        {balances.outstanding.toLocaleString() || "—"}
      </td>
      <CustomersActions customerId={id} />
    </tr>
  );
}

export default CustomerTableRow;
