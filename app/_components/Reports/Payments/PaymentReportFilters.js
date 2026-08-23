"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaymentReportFilters({
  search = "",
  from = "",
  to = "",
  paymentMethod = "all",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key, value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    router.push(pathname);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={17} className="text-gray-500" />

          <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
        </div>

        {(search || from || to || paymentMethod !== "all") && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <div className="relative">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            defaultValue={search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search customer..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400"
          />
        </div>

        <input
          type="date"
          value={from}
          onChange={(e) => updateFilter("from", e.target.value)}
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => updateFilter("to", e.target.value)}
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
        />
      </div>
    </div>
  );
}
