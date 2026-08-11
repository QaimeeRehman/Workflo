import { getProductPackagingByIdAndCategory } from "@/app/_lib/dataService";
import { formatNumberForCompactDisplay } from "@/app/_lib/helper";

async function InventorySummary({ inventory, inventoryMovement }) {
  const inventoryValue = inventory.reduce((acc, inventoryItem) => {
    const costPerBox = inventoryMovement.find(
      (mov) =>
        mov.product_id === inventoryItem.product_id &&
        mov.category === inventoryItem.category,
    )?.cost_per_box;

    return acc + inventoryItem.quantity_boxes * costPerBox;
  }, 0);
  let totalCartonInInventory = 0;
  for (const inventoryItem of inventory) {
    const productPackaging = await getProductPackagingByIdAndCategory(
      inventoryItem.product_id,
      inventoryItem.category,
    );
    const boxesPerCarton = productPackaging.boxes_per_carton;
    const carton = Math.floor(
      Number(inventoryItem.quantity_boxes) / Number(boxesPerCarton),
    );
    totalCartonInInventory += carton;
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      <InventoryCard
        title="Total Products"
        value={inventory.length}
        description="Products in inventory"
      />

      <InventoryCard
        title="Total Stock"
        value={totalCartonInInventory.toLocaleString()}
        description="Cartons"
      />

      <InventoryCard
        title="Inventory Value"
        value={`Rs ${formatNumberForCompactDisplay.format(inventoryValue)}`}
        description="Current stock value"
      />
    </div>
  );
}

function InventoryCard({ title, value, description }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.2)] ">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

export default InventorySummary;
