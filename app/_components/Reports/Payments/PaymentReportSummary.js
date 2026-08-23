import { Banknote, CreditCard, Receipt, Wallet } from "lucide-react";

function formatMoney(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
}

function SummaryCard({ title, value, icon: Icon, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-gray-400">{description}</p>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

export default function PaymentReportSummary({ summary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Received"
        value={formatMoney(summary?.totalReceived)}
        icon={Wallet}
        description="All money recieved"
      />

      <SummaryCard
        title="Cash"
        value={formatMoney(summary?.cash)}
        icon={Banknote}
        description="Cash sales + cash"
      />

      <SummaryCard
        title="Bank / Online"
        value={formatMoney(summary?.bank)}
        icon={CreditCard}
        description="Digital payments"
      />

      <SummaryCard
        title="Transactions"
        value={Number(summary?.count || 0).toLocaleString()}
        icon={Receipt}
        description="Money received transactions"
      />
    </div>
  );
}
