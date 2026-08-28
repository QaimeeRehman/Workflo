"use client";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

function getPaymentLabel(paymentType) {
  if (paymentType === "cash") return "Paid";
  if (paymentType === "partial") return "Partial";
  if (paymentType === "credit") return "Credit";

  return "Unknown";
}

function getPaymentStyles(paymentType) {
  if (paymentType === "cash") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (paymentType === "partial") {
    return "bg-amber-50 text-amber-700";
  }

  if (paymentType === "credit") {
    return "bg-red-50 text-red-700";
  }

  return "bg-slate-100 text-slate-600";
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatCurrency(value) {
  return `Rs. ${Number(value ?? 0).toLocaleString()}`;
}

function BillsReportTable({ bills }) {
  const router = useRouter();
  if (!bills?.length) {
    return (
      <section className="rounded-xl bg-white shadow-sm">
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <FileText size={21} className="text-slate-400" />
          </div>

          <h3 className="mt-4 font-medium text-slate-700">No bills found</h3>

          <p className="mt-1 text-sm text-slate-400">
            Try changing your search or filters.
          </p>
        </div>
      </section>
    );
  }

  function handleClick(e, public_token) {
    e.stopPropagation();

    router.push(`/dashboard/billing/${public_token}`);
  }

  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <h2 className="font-semibold text-slate-800">Bills</h2>

          <p className="mt-0.5 text-xs text-slate-400">
            {bills.length} bill{bills.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-xs uppercase tracking-wide text-slate-400">
              <th className="px-6 py-3 font-medium">Invoice</th>

              <th className="px-4 py-3 font-medium">Customer</th>

              <th className="px-4 py-3 font-medium">Date</th>

              <th className="px-4 py-3 font-medium">Sale Type</th>

              <th className="px-4 py-3 text-right font-medium">Total</th>

              <th className="px-4 py-3 text-right font-medium">Paid</th>

              <th className="px-6 py-3 text-right font-medium">Payment</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {bills.map((bill) => (
              <tr
                key={bill.id}
                onClick={(e) => handleClick(e, bill.public_token)}
                className="group transition-colors cursor-pointer hover:bg-slate-100"
              >
                {/* Invoice */}
                <td className="px-6 py-4 font-medium">{bill.invoice_number}</td>

                {/* Customer */}
                <td className="px-4 py-4 text-slate-600 font-medium">
                  {bill.customers?.fullName ?? "Walk-in Customer"}
                </td>

                {/* Date */}
                <td className="px-4 py-4 text-slate-500">
                  {formatDate(bill.created_at)}
                </td>

                {/* Sale type */}
                <td className="px-4 py-4 capitalize text-slate-500">
                  {bill.sale_type ?? "-"}
                </td>

                {/* Total */}
                <td className="px-4 py-4 text-right font-medium text-slate-700">
                  {formatCurrency(bill.total)}
                </td>

                {/* Paid */}
                <td className="px-4 py-4 text-right font-medium text-slate-600">
                  {formatCurrency(bill.amount_paid)}
                </td>

                {/* Payment */}
                <td className="px-6 py-4 text-right">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getPaymentStyles(
                      bill.payment_type,
                    )}`}
                  >
                    {getPaymentLabel(bill.payment_type)}
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

export default BillsReportTable;
