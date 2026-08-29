import Link from "next/link";
import { ArrowRight, Receipt } from "lucide-react";

const bills = [
  {
    id: 1,
    invoice: "INV-1025",
    customer: "ABC Traders",
    amount: 45000,
    status: "Credit",
  },
  {
    id: 2,
    invoice: "INV-1024",
    customer: "Cash Sale",
    amount: 18500,
    status: "Paid",
  },
  {
    id: 3,
    invoice: "INV-1023",
    customer: "Al Rehman Store",
    amount: 62000,
    status: "Partial",
  },
  {
    id: 4,
    invoice: "INV-1022",
    customer: "Cash Sale",
    amount: 12000,
    status: "Paid",
  },
];

function DashboardRecentBills({ recentBills }) {
  const bills = recentBills.map((bill) => {
    return {
      id: bill.id,
      invoice: bill.invoice_number,
      customer:
        bill.sale_type !== "cash_sale" ? bill.customers.fullName : "Cash Sale",
      amount: bill.total,
      status: bill.payment_type,
    };
  });
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Receipt size={18} className="text-primary-600" />

          <h2 className="font-semibold text-slate-800">Recent Bills</h2>
        </div>

        <Link
          href="/dashboard/reports/bills"
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View all
        </Link>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[500px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="pb-3 font-medium">Invoice</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 text-right font-medium">Amount</th>
              <th className="pb-3 text-right font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td className="py-3 font-medium text-slate-700">
                  {bill.invoice}
                </td>

                <td className="py-3 text-slate-500">{bill.customer}</td>

                <td className="py-3 text-right font-medium text-slate-700">
                  Rs. {bill.amount.toLocaleString()}
                </td>

                <td className="py-3 text-right">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      bill.status === "cash"
                        ? "bg-emerald-50 text-emerald-700"
                        : bill.status === "partial"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {bill.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DashboardRecentBills;
