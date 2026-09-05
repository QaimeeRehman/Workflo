import { CalendarDays } from "lucide-react";
import PeriodFilter from "../PeriodFilter";

function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your business performance.
        </p>
      </div>

    </div>
  );
}

export default DashboardHeader;
