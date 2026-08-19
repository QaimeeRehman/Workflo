"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function PeriodFilter({ defaultValue }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handlePeriodChange(value) {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete("period");
    } else {
      params.set("period", value);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex justify-end">
        <select
          value={searchParams.get("period") ?? defaultValue}
          onChange={(e) => handlePeriodChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3
            text-sm text-slate-700 outline-none
            focus:border-primary-500"
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
      </div>
    </div>
  );
}

export default PeriodFilter;
