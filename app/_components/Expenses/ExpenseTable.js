import ExpenseTableRow from "./ExpenseTableRow";

function ExpenseTable({ expenses }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_6px_0_rgba(0,0,0,0.12)]">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Date
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Description
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">
              Payment Method
            </th>

            <th className="px-6 py-4 text-right text-sm font-medium text-slate-600">
              Amount
            </th>

            <th className="px-6 py-4 text-center text-sm font-medium text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {expenses?.length > 0 ? (
            expenses.map((expense) => (
              <ExpenseTableRow key={expense.id} expense={expense} />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
