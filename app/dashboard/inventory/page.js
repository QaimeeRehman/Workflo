import InventoryFilters from "@/app/_components/Inventory/InventoryFilters";
import InventoryHeader from "@/app/_components/Inventory/InventoryHeader";
import InventorySummary from "@/app/_components/Inventory/InventorySummary";
import InventoryTable from "@/app/_components/Inventory/InventoryTable";
import {
  getFilteredInventory,
  getInventoryMovement,
} from "@/app/_lib/dataService";

async function page({ searchParams }) {
  const params = await searchParams;
  const search = params.search ?? "";
  const category = params.category ?? "";
  const stock = params.stock ?? "";
  let inventory = await getFilteredInventory();
  const inventoryMovement = await getInventoryMovement();
  if (search) {
    inventory = await getFilteredInventory(search, category, stock, undefined);
  }
  if (category) {
    inventory = await getFilteredInventory(search, category, stock, undefined);
  }
  if (stock) {
    inventory = await getFilteredInventory(search, category, stock, undefined);
  }

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <InventoryHeader />

      {/* Summary Cards */}
      <InventorySummary
        inventory={inventory}
        inventoryMovement={inventoryMovement}
      />

      {/* Filters */}
      <InventoryFilters />

      {/* Inventory Table */}
      <InventoryTable
        inventory={inventory}
        inventoryMovement={inventoryMovement}
      />
    </div>
  );
}

export default page;
