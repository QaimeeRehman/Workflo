"use client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

function CustomerLedgerRow({ entry }) {
  const router = useRouter();
  const isSale = entry.type === "sale";
  function handleClick() {
    router.push(`/billing/${entry.reference}`);
  }
  return (
    <tr onClick={handleClick} className="transition hover:bg-slate-50">
      {/* Date */}
      <td className="px-5 py-4">
        <div className="font-medium text-slate-700">
          {format(new Date(entry.date), "MMM dd, yyyy")}
        </div>

        <div className="mt-0.5 text-xs text-slate-400">
          {format(new Date(entry.date), "hh:mm a")}
        </div>
      </td>

      {/* Reference */}
      <td className="px-5 py-4">
        <span className="font-medium text-primary-600">
          {entry.reference || "—"}
        </span>
      </td>

      {/* Description */}
      <td className="px-5 py-4">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isSale ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {isSale ? "Sale" : "Payment"}
        </span>
      </td>

      {/* Debit */}
      <td className="px-5 py-4 text-right font-medium text-red-600">
        {entry.debit > 0 ? `Rs. ${entry.debit.toLocaleString()}` : "—"}
      </td>

      {/* Credit */}
      <td className="px-5 py-4 text-right font-medium text-emerald-600">
        {entry.credit > 0 ? `Rs. ${entry.credit.toLocaleString()}` : "—"}
      </td>

      {/* Balance */}
      <td className="px-5 py-4 text-right font-semibold text-slate-800">
        Rs. {entry.balance.toLocaleString()}
      </td>
    </tr>
  );
}

export default CustomerLedgerRow;
