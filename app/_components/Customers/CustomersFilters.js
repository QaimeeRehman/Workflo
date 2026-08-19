"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CustomersFilters({ outstanding }) {
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

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <input
          type="text"
          placeholder="Search by name or phone..."
          onChange={(e) => {
            handleFilter("search", e.target.value);
          }}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary-500"
        />

        <select
          defaultValue={searchParams.get("area") ?? ""}
          onChange={(e) => handleFilter("area", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500"
        >
          <option value="">All Areas</option>
          <option value="market">Market</option>
          <option value="tando bagho road">Tando Bagho Road</option>
          <option value="yousafabad">Yousafabad</option>
          <option value="jillani mohallah">Jillani Mohallah</option>
        </select>

        <select
          defaultValue={searchParams.get("saleType") ?? ""}
          onChange={(e) => handleFilter("saleType", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500"
        >
          <option value="">All Sale Types</option>
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
        </select>

        <select
          defaultValue={searchParams.get("taxCategory") ?? ""}
          onChange={(e) => handleFilter("taxCategory", e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500"
        >
          <option value="">All Tax Categories</option>
          <option value="filer">Filer</option>
          <option value="non-filer">Non-Filer</option>
        </select>

        <button
          onClick={() => handleFilter("outstanding", true)}
          className={`${outstanding ? "bg-slate-300" : ""} rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100`}
        >
          With Outstanding
        </button>
        <button
          onClick={() => router.replace(pathname)}
          className="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default CustomersFilters;
