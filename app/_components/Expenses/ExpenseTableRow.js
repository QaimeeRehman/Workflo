import { format } from "date-fns";
import ExpenseActions from "./ExpenseActions";

function ExpenseTableRow({ expense }) {
  const { id, expense_date, description, category, payment_method, amount } =
    expense;

  return (
    <tr className="border-t transition hover:bg-slate-50">
      {/* Date */}
      <td className="px-6 py-4">
        <div className="font-medium text-slate-700">
          {format(new Date(expense_date), "MMM dd, yyyy")}
        </div>

        <div className="mt-0.5 text-xs text-slate-400">
          {format(new Date(expense_date), "hh:mm a")}
        </div>
      </td>

      {/* Description */}
      <td className="px-6 py-4">
        <div className="max-w-55 truncate font-medium text-slate-700">
          {description || "—"}
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
          {category?.replaceAll("-", " ") || "—"}
        </span>
      </td>

      {/* Payment Method */}
      <td className="px-6 py-4">
        <span className="capitalize text-slate-600">
          {payment_method || "—"}
        </span>
      </td>

      {/* Amount */}
      <td className="px-6 py-4 text-right font-semibold text-red-600">
        Rs. {Number(amount ?? 0).toLocaleString()}
      </td>

      {/* Actions */}
      <ExpenseActions expenseId={id} />
    </tr>
  );
}

export default ExpenseTableRow;
