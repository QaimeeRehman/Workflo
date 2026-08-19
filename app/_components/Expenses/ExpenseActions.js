import Link from "next/link";

function ExpenseActions({ expenseId }) {
  return (
    <td className="px-6 py-4">
      <div className="flex justify-center gap-2">
        <Link
          href={`/dashboard/expenses/${expenseId}`}
          className="rounded-md bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300"
        >
          View
        </Link>

        <Link
          href={`/dashboard/expenses/${expenseId}/edit`}
          className="rounded-md bg-primary-500 px-3 py-1 text-sm text-white hover:bg-primary-900"
        >
          Edit
        </Link>

        <button className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
          Delete
        </button>
      </div>
    </td>
  );
}

export default ExpenseActions;
