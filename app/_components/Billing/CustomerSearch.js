"use client";

import toast from "react-hot-toast";
import { useBillingStore } from "../../_store/billingStore";
import { getCustomerAction } from "../../billing/action";
import { useState } from "react";

function CustomerSearch() {
  const [query, setQuery] = useState("");
  const setCustomer = useBillingStore((state) => state.setCustomer);

  async function handleSearch() {
    try {
      const customer = await getCustomerAction(query);

      if (!customer) {
        toast.error("Customer not found");
        return;
      }

      setCustomer(customer);
      toast.success("Customer loaded");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Enter Customer ID..."
        className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="rounded-lg bg-primary-500 px-6 text-white hover:bg-primary-900"
        onClick={handleSearch}
      >
        Search
      </button>

      <button className="rounded-lg border px-6 hover:bg-slate-100">
        Walk-in
      </button>
    </div>
  );
}

export default CustomerSearch;
