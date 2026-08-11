import CustomersActions from "./CustomersActions";

function CustomerTableRow({ customer }) {
  const { id, fullName, phone, saleType, taxCategory, area, cnic } = customer;
  return (
    <tr className="border-t hover:bg-slate-50">
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4 font-medium">{fullName}</td>
      <td className="px-6 py-4">{phone}</td>
      <td className="px-6 py-4">{cnic}</td>
      <td className="px-6 py-4">{saleType}</td>
      <td className="px-6 py-4">{taxCategory}</td>
      <td className="px-6 py-4">{area}</td>
      <CustomersActions customerId={id} />
    </tr>
  );
}

export default CustomerTableRow;
