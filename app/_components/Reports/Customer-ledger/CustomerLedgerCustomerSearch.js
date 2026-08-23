"use client";

import { Search, User } from "lucide-react";
import { useState } from "react";

function CustomerLedgerCustomerSearch({
  customers = [],
  selectedCustomer,
  onSelect,
}) {
  const [search, setSearch] = useState("");

  const searchTerm = search.trim().toLowerCase();

  const customerResults = searchTerm
    ? customers
        .filter((customer) =>
          `${customer.fullName} ${customer.phone ?? ""}`
            .toLowerCase()
            .includes(searchTerm),
        )
        .slice(0, 8)
    : [];

  function handleSelect(customer) {
    onSelect(customer);
    setSearch("");
  }

  function handleChange() {
    onSelect(null);
    setSearch("");
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <User size={19} className="text-primary-600" />

        <div>
          <h2 className="font-semibold text-slate-800">Customer</h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Select a customer to view their ledger
          </p>
        </div>
      </div>

      {/* Search */}
      {!selectedCustomer && (
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer by name or phone..."
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4
              text-sm text-slate-800 outline-none transition
              placeholder:text-slate-400
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />

          {/* Results */}
          {searchTerm && (
            <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              {customerResults.length > 0 ? (
                customerResults.map((customer) => (
                  <button
                    type="button"
                    key={customer.id}
                    onClick={() => handleSelect(customer)}
                    className="flex w-full items-center justify-between
                      border-b border-slate-100 px-4 py-3 text-left
                      last:border-0 hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-800">
                        {customer.fullName}
                      </p>

                      {customer.phone && (
                        <p className="mt-0.5 text-sm text-slate-500">
                          {customer.phone}
                        </p>
                      )}
                    </div>

                    <span className="ml-4 shrink-0 text-xs capitalize text-slate-500">
                      {customer.saleType}
                      {customer.taxCategory && ` · ${customer.taxCategory}`}
                    </span>
                  </button>
                ))
              ) : (
                <p className="p-4 text-sm text-slate-500">
                  No customers found.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Selected Customer */}
      {selectedCustomer && (
        <div className="flex items-center justify-between rounded-lg border border-primary-100 bg-primary-50 p-4">
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-800">
              {selectedCustomer.fullName}
            </p>

            <p className="mt-1 text-sm capitalize text-slate-500">
              {selectedCustomer.saleType}
              {selectedCustomer.taxCategory &&
                ` · ${selectedCustomer.taxCategory}`}
            </p>

            {selectedCustomer.phone && (
              <p className="mt-1 text-xs text-slate-400">
                {selectedCustomer.phone}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleChange}
            className="ml-4 shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Change
          </button>
        </div>
      )}
    </section>
  );
}

export default CustomerLedgerCustomerSearch;
