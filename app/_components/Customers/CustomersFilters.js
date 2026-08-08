"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CustomersFilters() {
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

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="grid grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Search by name or phone..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => {
            handleFilter("search", e.target.value);
          }}
          className="rounded-lg border px-4 py-3 outline-none focus:border-primary-500"
        />

        <select
          defaultValue={searchParams.get("area") ?? ""}
          onChange={(e) => handleFilter("area", e.target.value)}
          className="rounded-lg border px-4 py-3"
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
          className="rounded-lg border px-4 py-3"
        >
          <option value="">All Sale Types</option>
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
        </select>

        <select
          defaultValue={searchParams.get("taxCategory") ?? ""}
          onChange={(e) => handleFilter("taxCategory", e.target.value)}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">All Tax Categories</option>
          <option value="filer">Filer</option>
          <option value="non-filer">Non-Filer</option>
        </select>
        <button
          onClick={() => router.replace(pathname)}
          className="rounded-lg border px-4 py-3 hover:bg-slate-100"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default CustomersFilters;
