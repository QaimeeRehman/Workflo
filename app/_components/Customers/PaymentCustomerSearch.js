"use client";

import { useCustomerPaymentStore } from "@/app/_store/customerPaymentStore";
import { Search, User } from "lucide-react";
import { useState } from "react";

function PaymentCustomerSearch({ customers }) {
  const [customerSearch, setCustomerSearch] = useState("");
  const customer = useCustomerPaymentStore((state) => state.customer);
  const setCustomer = useCustomerPaymentStore((state) => state.setCustomer);

  const customerResults = customers.filter((item) =>
    `${item.fullName} ${item.phone}`
      .toLowerCase()
      .includes(customerSearch.toLowerCase()),
  );

  function handleCustomerSelect(customer) {
    setCustomer(customer);
    setCustomerSearch("");
  }

  function handleChange() {
    setCustomer(null);
    setCustomerSearch("");
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User size={19} className="text-primary-600" />

          <h2 className="font-semibold text-slate-800">Customer</h2>
        </div>
      </div>

      {/* No customer selected */}
      {!customer && (
        <>
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              placeholder="Search customer by name or phone..."
              className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4
                outline-none transition
                focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Results */}
          {customerSearch && (
            <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
              {customerResults.length > 0 ? (
                customerResults.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleCustomerSelect(item)}
                    className="flex w-full items-center justify-between
                      border-b border-slate-100 px-4 py-3 text-left
                      last:border-0 hover:bg-slate-100"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {item.fullName}
                      </p>

                      <p className="text-sm text-slate-500">{item.phone}</p>
                    </div>

                    <span className="text-xs capitalize text-slate-500">
                      {item.saleType} · {item.taxCategory}
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
        </>
      )}

      {/* Registered customer selected */}
      {customer && (
        <div
          className="flex items-center justify-between rounded-lg
            border border-primary-100 bg-primary-50 p-4"
        >
          <div>
            <p className="font-semibold text-slate-800">{customer.fullName}</p>

            <p className="mt-1 text-sm capitalize text-slate-500">
              {customer.saleType} · {customer.taxCategory} · {customer.area}
            </p>
          </div>

          <button
            type="button"
            onClick={handleChange}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Change
          </button>
        </div>
      )}
    </section>
  );
}

export default PaymentCustomerSearch;
