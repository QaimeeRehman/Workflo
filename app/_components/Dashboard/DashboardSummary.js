import {
  Banknote,
  CreditCard,
  Receipt,
  Wallet,
  ReceiptText,
  CircleDollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function formatCurrency(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function DashboardSummary({ dashboardSummary }) {
  const {
    totalSales = 0,
    cashSales = 0,
    customerSales = 0,
    outstanding = 0,
    totalExpenses = 0,
    netProfit = 0,
    netProfitMargin = 0,

    billCount = 0,
    cashBillCount = 0,
    customerBillCount = 0,
    outstandingCustomerCount = 0,
  } = dashboardSummary;

  const isProfit = netProfit >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      {/* ------------------------------------------------ */}
      {/* TOTAL SALES */}
      {/* ------------------------------------------------ */}

      <div
        className="relative overflow-hidden rounded-xl border border-primary-100
          bg-primary-50 p-6 shadow-sm xl:row-span-1"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-primary-700">Total Sales</p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {formatCurrency(totalSales)}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {billCount} {billCount === 1 ? "bill" : "bills"} this month
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary-600 shadow-sm">
            <Receipt size={21} />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary-700">
          <TrendingUp size={16} />
          Overall sales
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* CASH SALES */}
      {/* ------------------------------------------------ */}

      <SummaryCard
        title="Cash Sales"
        value={formatCurrency(cashSales)}
        subtitle={`${cashBillCount} ${cashBillCount === 1 ? "bill" : "bills"}`}
        icon={Banknote}
        iconClass="bg-emerald-50 text-emerald-600"
      />

      {/* ------------------------------------------------ */}
      {/* CUSTOMER SALES */}
      {/* ------------------------------------------------ */}

      <SummaryCard
        title="Customer Sales"
        value={formatCurrency(customerSales)}
        subtitle={`${customerBillCount} ${
          customerBillCount === 1 ? "bill" : "bills"
        }`}
        icon={CreditCard}
        iconClass="bg-blue-50 text-blue-600"
      />

      {/* ------------------------------------------------ */}
      {/* OUTSTANDING */}
      {/* ------------------------------------------------ */}

      <SummaryCard
        title="Outstanding"
        value={formatCurrency(outstanding)}
        subtitle={`${outstandingCustomerCount} ${
          outstandingCustomerCount === 1 ? "customer" : "customers"
        } owing`}
        icon={Wallet}
        iconClass="bg-red-50 text-red-600"
        valueClass="text-red-600"
      />

      {/* ------------------------------------------------ */}
      {/* EXPENSES */}
      {/* ------------------------------------------------ */}

      <SummaryCard
        title="Expenses"
        value={formatCurrency(totalExpenses)}
        subtitle="Operating expenses"
        icon={ReceiptText}
        iconClass="bg-orange-50 text-orange-600"
      />

      {/* ------------------------------------------------ */}
      {/* NET PROFIT */}
      {/* ------------------------------------------------ */}

      <SummaryCard
        title="Net Profit"
        value={
          isProfit
            ? formatCurrency(netProfit)
            : `- ${formatCurrency(Math.abs(netProfit))}`
        }
        subtitle={
          isProfit
            ? `${netProfitMargin.toFixed(1)}% profit margin`
            : `${Math.abs(netProfitMargin).toFixed(1)}% loss margin`
        }
        icon={isProfit ? TrendingUp : TrendingDown}
        iconClass={
          isProfit ? "bg-violet-50 text-violet-600" : "bg-red-50 text-red-600"
        }
        valueClass={isProfit ? "text-violet-600" : "text-red-600"}
      />
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
  valueClass = "text-slate-900",
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className={`mt-3 text-2xl font-bold tracking-tight ${valueClass}`}>
            {value}
          </p>

          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div
          className={`ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default DashboardSummary;
