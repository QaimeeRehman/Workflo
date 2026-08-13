import { toCapitalize } from "@/app/_lib/helper";
import { useBillingStore } from "@/app/_store/billingStore";
import { Trash2 } from "lucide-react";

function BillItem() {
  const items = useBillingStore((state) => state.items);
  const removeItem = useBillingStore((state) => state.removeItem);
  return (
    <section className="rounded-xl bg-white shadow">
      <div className="border-b border-slate-200 p-6">
        <h2 className="font-semibold text-slate-800">Bill Items</h2>
      </div>

      {items.length === 0 ? (
        <div className="p-10 text-center text-sm text-slate-500">
          No products added to this bill.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Quantity</th>
                <th className="px-5 py-3">Price / Box</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {toCapitalize(item.product_name)}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium uppercase text-slate-600">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {item.quantity} {item.unit}
                    <span className="ml-1 text-xs text-slate-400">
                      ({item.quantity_boxes} boxes)
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    Rs. {item.price_per_box.toLocaleString("en-PK")}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-800">
                    Rs. {item.total.toLocaleString("en-PK")}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default BillItem;
