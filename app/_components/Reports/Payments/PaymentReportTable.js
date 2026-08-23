import Link from "next/link";
import { ReceiptText } from "lucide-react";

function formatMoney(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
}

function formatDate(value) {
  if (!value) return "-";

  return new Date(value).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getPaymentType(transactionType) {
  if (transactionType === "sale") {
    return {
      label: "Cash Sale",
      className: "bg-emerald-50 text-emerald-700",
    };
  }

  if (transactionType === "customer_payment") {
    return {
      label: "Customer Payment",
      className: "bg-blue-50 text-blue-700",
    };
  }

  return {
    label: transactionType || "Payment",
    className: "bg-gray-100 text-gray-600",
  };
}

export default function PaymentReportTable({ payments = [] }) {
  console.log(payments[8]);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-gray-900">Payment Transactions</h2>

          <p className="mt-1 text-xs text-gray-500">
            All money received by the business
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          {payments.length}{" "}
          {payments.length === 1 ? "transaction" : "transactions"}
        </span>
      </div>

      {/* Empty state */}
      {payments.length === 0 ? (
        <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <ReceiptText size={21} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            No payments found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-gray-500">
            No money received matches the selected filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-left">
                <th className="px-5 py-3 font-medium text-gray-500">Date</th>

                <th className="px-5 py-3 font-medium text-gray-500">Type</th>

                <th className="px-5 py-3 font-medium text-gray-500">
                  Customer
                </th>

                <th className="px-5 py-3 font-medium text-gray-500">Invoice</th>

                <th className="px-5 py-3 font-medium text-gray-500">
                  Description
                </th>

                <th className="px-5 py-3 text-right font-medium text-gray-500">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => {
                const type = getPaymentType(payment.transaction_type);

                return (
                  <tr
                    key={payment.id}
                    className="transition hover:bg-gray-50/70"
                  >
                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      {formatDate(payment.created_at)}
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${type.className}`}
                      >
                        {type.label}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      {payment.customer?.fullName ? (
                        <span className="font-medium text-gray-900">
                          {payment.customer.fullName}
                        </span>
                      ) : (
                        <span className="text-gray-400">Walk-in Customer</span>
                      )}
                    </td>

                    {/* Invoice */}
                    <td className="px-5 py-4">
                      {payment.bill?.invoice_number ? (
                        <Link
                          href={`/billing/${payment.bill.id}`}
                          className="font-medium text-gray-700 hover:text-gray-900 hover:underline"
                        >
                          {payment.bill.invoice_number}
                        </Link>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Description */}
                    <td className="max-w-[260px] px-5 py-4">
                      <span className="block truncate text-gray-500">
                        {payment.description || "—"}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <span className="font-semibold text-emerald-600">
                        + {formatMoney(payment.amount)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
