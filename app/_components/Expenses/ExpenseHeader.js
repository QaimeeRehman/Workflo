import Link from "next/link";

function ExpenseHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Expenses</h1>

        <p className="mt-1 text-slate-500">
          Manage and track your business expenses.
        </p>
      </div>

      <Link
        href="/dashboard/expenses/new"
        className="rounded-lg bg-primary-500 px-5 py-3 font-medium text-white transition hover:bg-primary-900"
      >
        + Add Expense
      </Link>
    </div>
  );
}

export default ExpenseHeader;
