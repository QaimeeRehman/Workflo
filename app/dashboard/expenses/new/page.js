import Link from "next/link";
import ExpenseForm from "@/app/_components/Expenses/ExpenseForm";

function page() {
  return (
    <div className="mx-auto w-full  space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Add Expense</h1>

          <p className="mt-1 text-slate-500">Record a new business expense.</p>
        </div>

        <Link
          href="/dashboard/expenses"
          className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Back to Expenses
        </Link>
      </div>

      {/* Form */}
      <ExpenseForm />
    </div>
  );
}

export default page;
