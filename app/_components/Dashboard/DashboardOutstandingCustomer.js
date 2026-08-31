import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

function DashboardOutstandingCustomers({ customers }) {
  return (
    <section className="h-full rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-slate-800">
            Outstanding Customers
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Customers with pending balances.
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
          <Users size={18} />
        </div>
      </div>

      <div className="mt-5 divide-y divide-slate-100">
        {customers.map((customer) => (
          <Link
            key={customer.id}
            href={`/customers/${customer.id}`}
            className="flex items-center justify-between py-3 transition hover:bg-slate-50"
          >
            <div>
              <p className="text-sm font-medium text-slate-800">
                {customer.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">Outstanding</p>
            </div>

            <p className="text-sm font-semibold text-red-600">
              Rs. {customer.balance.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/dashboard/customers?outstanding=true"
        className="mt-4 flex items-center justify-center gap-2 rounded-lg
          border border-slate-200 px-4 py-2.5 text-sm font-medium
          text-slate-600 transition hover:bg-slate-50"
      >
        View Customers
        <ArrowRight size={15} />
      </Link>
    </section>
  );
}

export default DashboardOutstandingCustomers;
