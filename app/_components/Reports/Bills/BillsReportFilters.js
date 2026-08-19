"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function BillsReportFilters({
  search: initialSearch = "",
  from: initialFrom = "",
  to: initialTo = "",
  paymentType: initialPaymentType = "all",
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(initialSearch);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [paymentType, setPaymentType] = useState(initialPaymentType);

  function applyFilters({
    searchValue = search,
    fromValue = from,
    toValue = to,
    paymentValue = paymentType,
  } = {}) {
    const params = new URLSearchParams();

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    }

    if (fromValue) {
      params.set("from", fromValue);
    }

    if (toValue) {
      params.set("to", toValue);
    }

    if (paymentValue !== "all") {
      params.set("paymentType", paymentValue);
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleSearchChange(event) {
    const value = event.target.value;

    setSearch(value);

    applyFilters({
      searchValue: value,
    });
  }

  function handleFromChange(event) {
    const value = event.target.value;

    setFrom(value);

    applyFilters({
      fromValue: value,
    });
  }

  function handleToChange(event) {
    const value = event.target.value;

    setTo(value);

    applyFilters({
      toValue: value,
    });
  }

  function handlePaymentChange(event) {
    const value = event.target.value;

    setPaymentType(value);

    applyFilters({
      paymentValue: value,
    });
  }

  function clearFilters() {
    setSearch("");
    setFrom("");
    setTo("");
    setPaymentType("all");

    router.push(pathname);
  }

  const hasFilters = search.trim() || from || to || paymentType !== "all";

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-[minmax(240px,1fr)_150px_150px_170px]">
        {/* Search */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            Search
          </label>

          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Invoice or customer..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>

        {/* From */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            From
          </label>

          <input
            type="date"
            value={from}
            onChange={handleFromChange}
            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* To */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            To
          </label>

          <input
            type="date"
            value={to}
            onChange={handleToChange}
            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Payment */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            Payment
          </label>

          <select
            value={paymentType}
            onChange={handlePaymentChange}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          >
            <option value="all">All payments</option>
            <option value="cash">Paid</option>
            <option value="partial">Partial</option>
            <option value="credit">Credit</option>
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500">
            Filters are currently applied.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-800"
          >
            <X size={15} />
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

export default BillsReportFilters;
