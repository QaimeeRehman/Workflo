import { Wallet, CalendarDays, Receipt } from "lucide-react";

function ExpenseSummary({
  totalExpenses = 0,
  monthlyExpenses = 0,
  todayExpenses = 0,
}) {
  const cards = [
    {
      title: "Today",
      value: `Rs. ${todayExpenses.toLocaleString()}`,
      description: "Expenses recorded today",
      icon: Receipt,
      iconClass: "bg-blue-50 text-blue-600",
      valueClass: "text-slate-800",
    },
    {
      title: "This Month",
      value: `Rs. ${monthlyExpenses.toLocaleString()}`,
      description: "Expenses this month",
      icon: CalendarDays,
      iconClass: "bg-orange-50 text-orange-600",
      valueClass: "text-slate-800",
    },
    {
      title: "Total Expenses",
      value: `Rs. ${totalExpenses.toLocaleString()}`,
      description: "All recorded expenses",
      icon: Wallet,
      iconClass: "bg-red-50 text-red-600",
      valueClass: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl bg-white p-6 shadow-[0_0_6px_0_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={26} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-600">
                  {card.title}
                </p>

                <p className={`mt-1 text-2xl font-bold ${card.valueClass}`}>
                  {card.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ExpenseSummary;
