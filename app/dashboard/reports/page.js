import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Boxes,
  ClipboardList,
  FileText,
  Receipt,
  Users,
} from "lucide-react";

const reports = [
  {
    title: "Bills",
    description: "View, search, print and share sales bills.",
    href: "/dashboard/reports/bills",
    icon: Receipt,
  },
  {
    title: "Payments",
    description: "View customer payment records and receipts.",
    href: "/dashboard/reports/payments",
    icon: Banknote,
  },
  {
    title: "Expenses",
    description: "View and print recorded expense slips.",
    href: "/dashboard/reports/expenses",
    icon: FileText,
  },
  {
    title: "Stock In",
    description: "View stock-in records and supplier documents.",
    href: "/dashboard/reports/stock-in",
    icon: Boxes,
  },
  {
    title: "Customer Ledger",
    description: "View customer transactions and outstanding balances.",
    href: "/dashboard/reports/customer-ledger",
    icon: Users,
  },
  {
    title: "Inventory",
    description: "View inventory and stock movement records.",
    href: "/dashboard/reports/inventory",
    icon: ClipboardList,
  },
];

function page() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Reports</h1>

        <p className="mt-1 text-sm text-slate-500">
          View, print and manage your business records.
        </p>
      </div>

      {/* Reports */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <Link
              key={report.title}
              href={report.href}
              className="group rounded-xl bg-white p-5 shadow-sm transition hover:bg-slate-100 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50">
                  <Icon size={21} className="text-primary-600" />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-primary-600"
                />
              </div>

              <div className="mt-5">
                <h2 className="font-semibold text-slate-800">{report.title}</h2>

                <p className="mt-1.5 text-sm leading-5 text-slate-500">
                  {report.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default page;
