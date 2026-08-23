import { ReceiptText } from "lucide-react";

export default function PaymentReportHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <ReceiptText size={22} />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Payment Report
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track customer payments and received amounts.
          </p>
        </div>
      </div>
    </div>
  );
}
