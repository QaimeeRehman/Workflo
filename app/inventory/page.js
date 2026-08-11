import InventorySummary from "../_components/Inventory/InventorySummary";
import InventoryFilters from "../_components/Inventory/InventoryFilters";
import InventoryTable from "../_components/Inventory/InventoryTable";
import InventoryHeader from "../_components/Inventory/InventoryHeader";

function page() {
  return (
    <div className="space-y-6 min-w-[80vw]">
      {/* Header */}
      <InventoryHeader />

      {/* Summary Cards */}
      <InventorySummary />

      {/* Filters */}
      <InventoryFilters />

      {/* Inventory Table */}
      <InventoryTable />
    </div>
  );
}

export default page;
