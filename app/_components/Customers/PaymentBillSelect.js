"use client";

import { useCustomerPaymentStore } from "@/app/_store/customerPaymentStore";
import { FileText } from "lucide-react";

function PaymentBillSelect({ bills, onBillSelect }) {
  const selectedBill = useCustomerPaymentStore((state) => state.bill);
  const setBill = useCustomerPaymentStore((state) => state.setBill);

  function handleBillSelect(bill) {
    setBill(bill);
    onBillSelect();
  }

  if (!bills?.length) {
    return (
      <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
        <div className="flex items-center gap-2">
          <FileText size={19} className="text-emerald-600" />

          <h2 className="font-semibold text-emerald-800">Outstanding Bills</h2>
        </div>

        <p className="mt-2 text-sm text-emerald-700">
          This customer has no outstanding bills.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow">
      <div className="mb-5 flex items-center gap-2">
        <FileText size={19} className="text-primary-600" />

        <h2 className="font-semibold text-slate-800">Outstanding Bills</h2>
      </div>

      <div className="space-y-3">
        {bills.map((bill) => {
          const isSelected = selectedBill?.id === bill.id;

          return (
            <button
              type="button"
              key={bill.id}
              onClick={() => handleBillSelect(bill)}
              className={`w-full rounded-lg border p-4 text-left transition ${
                isSelected
                  ? "border-primary-500 bg-primary-50 ring-2 ring-primary-100"
                  : "border-slate-200 hover:border-primary-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-800">
                    {bill.invoice_number}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(bill.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-500">Outstanding</p>

                  <p className="font-bold text-red-600">
                    Rs. {bill.outstanding.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex gap-6 text-xs text-slate-500">
                <span>
                  Total:{" "}
                  <strong className="text-slate-700">
                    Rs. {bill.total.toLocaleString()}
                  </strong>
                </span>

                <span>
                  Paid:{" "}
                  <strong className="text-slate-700">
                    Rs. {bill.amount_paid.toLocaleString()}
                  </strong>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default PaymentBillSelect;
