import { Users, Wallet, UserRound, TrendingUp } from "lucide-react";

function CustomersLedgerSummary({
  //   totalCustomers = 0,
  //   totalOutstanding = 0,
  //   customersOwing = 0,
  totalSales = 0,
  customersLedgerSummary,
}) {
  const { customersOwing, totalCustomers, totalOutstanding } =
    customersLedgerSummary;
  const cards = [
    {
      label: "Total Customers",
      value: totalCustomers.toLocaleString(),
      description: "All registered customers",
      icon: Users,
      iconClass: "bg-blue-50 text-blue-600",
      valueClass: "text-slate-900",
    },
    {
      label: "Total Outstanding",
      value: `Rs. ${totalOutstanding.toLocaleString()}`,
      description: "Total amount due from customers",
      icon: Wallet,
      iconClass: "bg-emerald-50 text-emerald-600",
      valueClass: "text-emerald-600",
    },
    {
      label: "Customers Owing",
      value: customersOwing.toLocaleString(),
      description: "Customers with outstanding balance",
      icon: UserRound,
      iconClass: "bg-orange-50 text-orange-600",
      valueClass: "text-slate-900",
    },
    {
      label: "Total Sales",
      value: `Rs. ${totalSales.toLocaleString()}`,
      description: "Total billed amount",
      icon: TrendingUp,
      iconClass: "bg-purple-50 text-purple-600",
      valueClass: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-xl bg-white p-6 shadow-[0_0_6px_0_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={26} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-600">
                  {card.label}
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

export default CustomersLedgerSummary;
