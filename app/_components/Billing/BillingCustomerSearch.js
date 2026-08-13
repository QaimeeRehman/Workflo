// import { useBillingStore } from "@/app/_store/billingStore";
// import { Search, User } from "lucide-react";
// import { useState } from "react";

// // const MOCK_CUSTOMERS = [
// //   {
// //     id: 1,
// //     name: "ABC Traders",
// //     phone: "0300-1234567",
// //     saleType: "retailer",
// //     taxCategory: "filer",
// //   },
// //   {
// //     id: 2,
// //     name: "Al Rehman Store",
// //     phone: "0312-7654321",
// //     saleType: "wholesale",
// //     taxCategory: "nonFiler",
// //   },
// // ];

// function BillingCustomerSearch({ customers }) {
//   const [customerSearch, setCustomerSearch] = useState("");
//   const customer = useBillingStore((state) => state.customer);
//   const setCustomer = useBillingStore((state) => state.setCustomer);
//   const setItems = useBillingStore((state) => state.setItems);
//   const customerResults = customers.filter((item) =>
//     item.fullName.toLowerCase().includes(customerSearch.toLowerCase()),
//   );
//   return (
//     <section className="rounded-xl bg-white p-6 shadow">
//       <div className="mb-5 flex items-center gap-2">
//         <User size={19} className="text-primary-600" />

//         <h2 className="font-semibold text-slate-800">Customer</h2>
//       </div>

//       {!customer ? (
//         <>
//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               value={customerSearch}
//               onChange={(e) => setCustomerSearch(e.target.value)}
//               placeholder="Search customer by name or phone..."
//               className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
//             />
//           </div>

//           {customerSearch && (
//             <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
//               {customerResults.length > 0 ? (
//                 customerResults.map((item) => (
//                   <button
//                     type="button"
//                     key={item.id}
//                     onClick={() => {
//                       setCustomer(item);
//                       setCustomerSearch("");
//                     }}
//                     className="flex w-full items-center justify-between border-b border-slate-100 px-4 py-3 text-left last:border-0 hover:bg-slate-100"
//                   >
//                     <div>
//                       <p className="font-medium text-slate-800">
//                         {item.fullName}
//                       </p>

//                       <p className="text-sm text-slate-500">{item.phone}</p>
//                     </div>

//                     <span className="text-xs capitalize text-slate-500">
//                       {item.saleType} · {item.taxCategory}
//                     </span>
//                   </button>
//                 ))
//               ) : (
//                 <p className="p-4 text-sm text-slate-500">
//                   No customers found.
//                 </p>
//               )}
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="flex items-center justify-between rounded-lg border border-primary-100 bg-primary-50 p-4">
//           <div>
//             <p className="font-semibold text-slate-800">{customer.fullName}</p>

//             <p className="mt-1 text-sm capitalize text-slate-500">
//               {customer.saleType} · {customer.taxCategory}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               setCustomer(null);
//               setItems([]);
//             }}
//             className="text-sm font-medium text-red-600 hover:text-red-700"
//           >
//             Change
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }

// export default BillingCustomerSearch;

"use client";

import { useBillingStore } from "@/app/_store/billingStore";
import { Search, User, Banknote } from "lucide-react";
import { useState } from "react";

function BillingCustomerSearch({ customers }) {
  const [customerSearch, setCustomerSearch] = useState("");

  const customer = useBillingStore((state) => state.customer);
  const saleType = useBillingStore((state) => state.saleType);

  const setCustomer = useBillingStore((state) => state.setCustomer);
  const setSaleType = useBillingStore((state) => state.setSaleType);
  const setItems = useBillingStore((state) => state.setItems);

  const customerResults = customers.filter((item) =>
    `${item.fullName} ${item.phone}`
      .toLowerCase()
      .includes(customerSearch.toLowerCase()),
  );

  function handleCustomerSelect(customer) {
    setCustomer(customer);
    setSaleType("customer");
    setCustomerSearch("");
  }

  function handleCashSale() {
    setCustomer(null);
    setSaleType("cash_sale");
    setCustomerSearch("");
    setItems([]);
  }

  function handleChange() {
    setCustomer(null);
    setSaleType("customer");
    setCustomerSearch("");
    setItems([]);
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User size={19} className="text-primary-600" />

          <h2 className="font-semibold text-slate-800">Customer</h2>
        </div>

        {/* Cash Sale button */}
        {!customer && saleType !== "cash_sale" && (
          <button
            type="button"
            onClick={handleCashSale}
            className="flex items-center gap-2 rounded-lg border border-emerald-200
              bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700
              transition hover:bg-emerald-100"
          >
            <Banknote size={16} />
            Cash Sale
          </button>
        )}
      </div>

      {/* No customer selected */}
      {!customer && saleType !== "cash_sale" && (
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
      {customer && saleType === "customer" && (
        <div
          className="flex items-center justify-between rounded-lg
            border border-primary-100 bg-primary-50 p-4"
        >
          <div>
            <p className="font-semibold text-slate-800">{customer.fullName}</p>

            <p className="mt-1 text-sm capitalize text-slate-500">
              {customer.saleType} · {customer.taxCategory}
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

      {/* Cash Sale selected */}
      {saleType === "cash_sale" && (
        <div
          className="flex items-center justify-between rounded-lg
            border border-emerald-200 bg-emerald-50 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <Banknote size={20} className="text-emerald-700" />
            </div>

            <div>
              <p className="font-semibold text-slate-800">Cash Sale</p>

              <p className="mt-1 text-sm text-slate-500">Walk-in customer</p>
            </div>
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

export default BillingCustomerSearch;
