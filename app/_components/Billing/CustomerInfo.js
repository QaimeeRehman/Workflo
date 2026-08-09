"use client";
import { useBillingStore } from "../../_store/billingStore";

function CustomerInfo() {
  const customer = useBillingStore((state) => state.customer);

  if (!customer)
    return (
      <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4">
        <p>No customer selected</p>
      </div>
    );
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4">
      <div>
        <p className="text-sm text-slate-500">Customer</p>
        <p className="font-semibold">{customer.fullName}</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Sale Type</p>
        <p className="font-semibold">{customer.saleType}</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Tax Category</p>
        <p className="font-semibold">{customer.taxCategory}</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Area</p>
        <p className="font-semibold">{customer.area}</p>
      </div>
    </div>
  );
}

export default CustomerInfo;
