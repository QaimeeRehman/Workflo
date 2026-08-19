"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ExpenseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleFilter(name, value) {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function clearFilters() {
    router.replace(pathname, {
      scroll: false,
    });
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Search expenses..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => handleFilter("search", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary-500"
        />

        {/* Category */}
        <select
          defaultValue={searchParams.get("category") ?? ""}
          onChange={(e) => handleFilter("category", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500"
        >
          <option value="">All Categories</option>

          <option value="rent">Rent</option>
          <option value="utilities">Utilities</option>
          <option value="transport">Transport</option>
          <option value="fuel">Fuel</option>
          <option value="salaries">Salaries</option>
          <option value="office-supplies">Office Supplies</option>
          <option value="maintenance">Maintenance</option>
          <option value="telephone-internet">Telephone / Internet</option>
          <option value="taxes">Taxes / Government</option>
          <option value="bank-charges">Bank Charges</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>

        {/* Payment Method */}
        <select
          defaultValue={searchParams.get("paymentMethod") ?? ""}
          onChange={(e) => handleFilter("paymentMethod", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500"
        >
          <option value="">All Payment Methods</option>
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
          <option value="other">Other</option>
        </select>

        {/* Period */}
        <select
          defaultValue={searchParams.get("period") ?? "month"}
          onChange={(e) => handleFilter("period", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500"
        >
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </select>

        {/* Clear */}
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default ExpenseFilters;
