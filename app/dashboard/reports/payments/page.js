import {
  getPaymentsReportSummary,
  getPaymentsReport,
} from "@/app/_lib/dataService";

import PaymentReportHeader from "@/app/_components/Reports/Payments/PaymentReportHeader";
import PaymentReportSummary from "@/app/_components/Reports/Payments/PaymentReportSummary";
import PaymentReportFilters from "@/app/_components/Reports/Payments/PaymentReportFilters";
import PaymentReportTable from "@/app/_components/Reports/Payments/PaymentReportTable";

export default async function PaymentsReportPage({ searchParams }) {
  const params = await searchParams;

  const search = params?.search || "";
  const from = params?.from || "";
  const to = params?.to || "";
  const paymentMethod = params?.paymentMethod || "all";

  const [payments, summary] = await Promise.all([
    getPaymentsReport({
      search,
      from,
      to,
      paymentMethod,
    }),
    getPaymentsReportSummary({
      search,
      from,
      to,
      paymentMethod,
    }),
  ]);

  return (
    <div className="space-y-6">
      <PaymentReportHeader />

      <PaymentReportSummary summary={summary} />

      <PaymentReportFilters
        search={search}
        from={from}
        to={to}
        paymentMethod={paymentMethod}
      />

      <PaymentReportTable payments={payments} />
    </div>
  );
}
