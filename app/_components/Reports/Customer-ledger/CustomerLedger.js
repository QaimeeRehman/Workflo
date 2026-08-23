"use client";
import CustomerLedgerFilter from "../../Customers/CustomerLedgerFilter";
import PeriodFilter from "../../PeriodFilter";
import CustomerLedgerRow from "./CustomerLedgerRow";

function CustomerLedger({ customer, ledger }) {
  return (
    <section className="overflow-hidden rounded-xl bg-white shadow">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-semibold text-slate-800">Customer Ledger</h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete account history for this customer.
            </p>
          </div>

          <PeriodFilter defaultValue="all" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-3 font-medium text-slate-600">Date</th>

              <th className="px-5 py-3 font-medium text-slate-600">
                Reference
              </th>

              <th className="px-5 py-3 font-medium text-slate-600">
                Description
              </th>

              <th className="px-5 py-3 text-right font-medium text-slate-600">
                Debit
              </th>

              <th className="px-5 py-3 text-right font-medium text-slate-600">
                Credit
              </th>

              <th className="px-5 py-3 text-right font-medium text-slate-600">
                Balance
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {ledger.length > 0 ? (
              ledger.map((entry) => (
                <CustomerLedgerRow key={entry.id} entry={entry} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-slate-500"
                >
                  No account activity found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CustomerLedger;
