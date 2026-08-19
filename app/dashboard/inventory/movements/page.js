import MovementsFilters from "@/app/_components/Inventory/movements/MovementsFilters";
import MovementsHeader from "@/app/_components/Inventory/movements/MovementsHeader";
import MovementsSummary from "@/app/_components/Inventory/movements/MovementsSummary";
import MovementsTable from "@/app/_components/Inventory/movements/MovementsTable";
import { getInventoryMovementsWithProduct } from "@/app/_lib/dataService";
import { getDatePeriodWise } from "@/app/_lib/helper";

async function page({ searchParams }) {
  const params = await searchParams;
  const period = params?.period ?? "month";
  const { from, to } = getDatePeriodWise(period);
  const movements = await getInventoryMovementsWithProduct(from, to);

  return (
    <div className="space-y-6 min-w-[80vw]">
      {/* Header */}
      <MovementsHeader />
      {/* Summary */}
      <MovementsSummary movements={movements} />
      {/* Filters */}
      <MovementsFilters />
      {/* Movement Table */}
      <MovementsTable movements={movements} />
    </div>
  );
}

export default page;
