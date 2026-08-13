"use client";
import { useBillingStore } from "@/app/_store/billingStore";
import BillingPayment from "./BillingPayment";

function BillSummary() {
  const discount = useBillingStore((state) => state.discount);
  const setDiscount = useBillingStore((state) => state.setDiscount);
  const items = useBillingStore((state) => state.items);
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = Math.min(Number(discount) || 0, subtotal);
  const total = Number((subtotal - discountAmount).toFixed(2));

  return (
    <aside className="h-fit rounded-xl bg-white p-6 shadow xl:sticky xl:top-6">
      <h2 className="mb-6 text-lg font-semibold text-slate-800">
        Bill Summary
      </h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Items</span>

          <span className="font-medium text-slate-800">{items.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Subtotal</span>

          <span className="font-medium text-slate-800">
            Rs. {subtotal.toLocaleString("en-PK")}
          </span>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-500">Discount</label>

          <input
            type="number"
            min="0"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-slate-800">
              Total
            </span>

            <span className="text-xl font-bold text-primary-600">
              Rs. {total.toLocaleString("en-PK")}
            </span>
          </div>
        </div>
      </div>

      {/* Payment */}
      {/* <div className="mt-7">
        <p className="mb-3 text-sm font-medium text-slate-700">Payment Type</p>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-lg border border-primary-500 bg-primary-50 px-3 py-3 text-sm font-medium text-primary-700"
          >
            Cash
          </button>

          <button
            type="button"
            className="rounded-lg border border-slate-300 px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Credit
          </button>
        </div>
      </div> */}

      <BillingPayment total={total} subtotal={subtotal} />
      {/* Action */}
    </aside>
  );
}

export default BillSummary;
