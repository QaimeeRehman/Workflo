import { toCapitalize } from "@/app/_lib/helper";

function BillInvoice({ bill }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Invoice Items</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Product</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {bill.map((item, i) => (
            <tr key={i} className="border-b">
              {/* str.charAt(0).toUpperCase() + str.slice(1) */}
              <td className="py-4">
                {toCapitalize(item.product)}
                {/* {item.product.charAt(0).toUpperCase() + item.product.slice(1)} */}
              </td>
              <td>{item.category.toUpperCase()}</td>
              <td>{item.Qty}</td>
              <td>{item.price}</td>
              <td>{item.total}</td>
              <td>
                <button className="rounded-lg bg-red-600 px-3 py-1.5 font-semibold text-white transition duration-200 hover:bg-red-900 active:scale-95">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillInvoice;
