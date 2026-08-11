import InventoryTableItem from "./InventoryTableItem";

async function InventoryTable({ inventory, inventoryMovement }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      {/* Table Header */}
      <div className="grid grid-cols-6 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600">
        <div className="col-span-2">Product</div>
        <div>Category</div>
        <div>Stock</div>
        <div>Cost / Carton</div>
        <div>Stock Value</div>
      </div>

      <InventoryTableItem
        inventory={inventory}
        inventoryMovement={inventoryMovement}
      />
    </div>
  );
}

export default InventoryTable;
