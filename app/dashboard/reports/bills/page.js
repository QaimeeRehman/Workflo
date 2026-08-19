import { getBillsReport } from "@/app/_lib/dataService";

import BillsReportTable from "@/app/_components/Reports/Bills/BillsReportTable";
import BillsReportFilters from "@/app/_components/Reports/Bills/BillsReportFilters";

async function page({ searchParams }) {
  const params = await searchParams;

  const search = params?.search ?? "";
  const from = params?.from ?? "";
  const to = params?.to ?? "";
  const paymentType = params?.paymentType ?? "all";

  const bills = await getBillsReport({
    search,
    from,
    to,
    paymentType,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Bills Report</h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage your sales bills.
        </p>
      </div>

      <BillsReportFilters
        search={search}
        from={from}
        to={to}
        paymentType={paymentType}
      />

      <BillsReportTable bills={bills} />
    </div>
  );
}

export default page;
