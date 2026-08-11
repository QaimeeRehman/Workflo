import InventorySummary from "../_components/Inventory/InventorySummary";
import InventoryFilters from "../_components/Inventory/InventoryFilters";
import InventoryTable from "../_components/Inventory/InventoryTable";
import InventoryHeader from "../_components/Inventory/InventoryHeader";
import {
  getAllInventory,
  getFilteredInventory,
  getInventoryMovement,
  getProductsByQuery,
} from "../_lib/dataService";
import { supabase } from "../_lib/supabase";

async function page({ searchParams }) {
  const params = await searchParams;
  const search = params.search ?? "";
  const category = params.category ?? "";
  const stock = params.stock ?? "";
  let inventory = await getFilteredInventory();
  const inventoryMovement = await getInventoryMovement();
  if (search) {
    inventory = await getFilteredInventory(search, category, stock);
  }
  if (category) {
    inventory = await getFilteredInventory(search, category, stock);
  }
  if (stock) {
    inventory = await getFilteredInventory(search, category, stock);
  }
  return (
    <div className="space-y-6 min-w-[80vw]">
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
