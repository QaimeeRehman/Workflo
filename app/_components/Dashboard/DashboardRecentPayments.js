import Link from "next/link";
import { ArrowDownLeft, Banknote } from "lucide-react";

const payments = [
  {
    id: 1,
    customer: "ABC Traders",
    amount: 25000,
    method: "Cash",
  },
  {
    id: 2,
    customer: "Al Rehman Store",
    amount: 40000,
    method: "Bank",
  },
  {
    id: 3,
    customer: "City Super Store",
    amount: 15000,
    method: "Cash",
  },
  {
    id: 4,
    customer: "New Karachi Mart",
    amount: 30000,
    method: "Cash",
  },
];

function DashboardRecentPayments({ recentPayments }) {
  const payments = recentPayments.map((payment) => {
    return {
      id: payment.id,
      customer: payment.customers.fullName,
      amount: payment.amount,
      method: payment.payment_method,
    };
  });
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Banknote size={18} className="text-emerald-600" />

          <h2 className="font-semibold text-slate-800">Recent Payments</h2>
        </div>

        {/* <Link
          href="/dashboard/customers"
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View all
        </Link> */}
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                <ArrowDownLeft size={16} className="text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  {payment.customer}
                </p>

                <p className="mt-1 text-xs text-slate-500">{payment.method}</p>
              </div>
            </div>

            <p className="text-sm font-semibold text-emerald-600">
              + Rs. {payment.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardRecentPayments;
