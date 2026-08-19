import ExpenseFilters from "@/app/_components/Expenses/ExpenseFilters";
import ExpenseHeader from "@/app/_components/Expenses/ExpenseHeader";
import ExpenseSummary from "@/app/_components/Expenses/ExpenseSummary";
import ExpenseTable from "@/app/_components/Expenses/ExpenseTable";
import { getExpenses } from "@/app/_lib/dataService";
import { isSameDay, isSameMonth } from "date-fns";
import { getDatePeriodWise } from "@/app/_lib/helper";

async function page({ searchParams }) {
  const params = await searchParams;
  const search = params.search ?? null;
  const category = params.category ?? null;
  const paymentMethod = params.paymentMethod ?? null;
  const period = params.period ?? null;
  const expenses = await getExpenses();

  let filteredExpenses = expenses;

  if (search) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      expense.description.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === category,
    );
  }

  if (paymentMethod) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.payment_method === paymentMethod,
    );
  }

  if (period && period !== "all") {
    const { from, to } = getDatePeriodWise(period);

    filteredExpenses = filteredExpenses.filter((expense) => {
      const expenseDate = new Date(expense.expense_date);

      return (!from || expenseDate >= from) && (!to || expenseDate <= to);
    });
  }

  const totalExpenses = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0,
  );

  const monthlyExpenses = expenses
    .filter((expense) =>
      isSameMonth(new Date(expense.expense_date), new Date()),
    )
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const todayExpenses = expenses
    .filter((expense) => isSameDay(new Date(expense.expense_date), new Date()))
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="space-y-6">
      <ExpenseHeader />
      <ExpenseSummary
        totalExpenses={totalExpenses}
        monthlyExpenses={monthlyExpenses}
        todayExpenses={todayExpenses}
      />
      <ExpenseFilters />
      <ExpenseTable expenses={filteredExpenses} />
    </div>
  );
}

export default page;
