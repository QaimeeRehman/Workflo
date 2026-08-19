// import { getProductPackagingByIdAndCategory } from "@/app/_lib/dataService";
// import { formatNumberForCompactDisplay } from "@/app/_lib/helper";

// async function InventorySummary({ inventory, inventoryMovement }) {
//   const inventoryValue = inventory.reduce((acc, inventoryItem) => {
//     const costPerBox = inventoryMovement.find(
//       (mov) =>
//         mov.product_id === inventoryItem.product_id &&
//         mov.category === inventoryItem.category,
//     )?.cost_per_box;

//     return acc + inventoryItem.quantity_boxes * costPerBox;
//   }, 0);
//   let totalCartonInInventory = 0;
//   for (const inventoryItem of inventory) {
//     const productPackaging = await getProductPackagingByIdAndCategory(
//       inventoryItem.product_id,
//       inventoryItem.category,
//     );
//     const boxesPerCarton = productPackaging.boxes_per_carton;
//     const carton = Math.floor(
//       Number(inventoryItem.quantity_boxes) / Number(boxesPerCarton),
//     );
//     totalCartonInInventory += carton;
//   }

//   return (
//     <div className="grid grid-cols-4 gap-5">
//       <InventoryCard
//         title="Total Products"
//         value={inventory.length}
//         description="Products in inventory"
//       />

//       <InventoryCard
//         title="Total Stock"
//         value={totalCartonInInventory.toLocaleString()}
//         description="Cartons"
//       />

//       <InventoryCard
//         title="Inventory Value"
//         value={`Rs ${formatNumberForCompactDisplay.format(inventoryValue)}`}
//         description="Current stock value"
//       />
//     </div>
//   );
// }

// function InventoryCard({ title, value, description }) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.2)] ">
//       <p className="text-sm font-medium text-slate-500">{title}</p>

//       <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>

//       <p className="mt-1 text-xs text-slate-400">{description}</p>
//     </div>
//   );
// }

// export default InventorySummary;

import { Package, Boxes, Wallet } from "lucide-react";

import { getProductPackagingByIdAndCategory } from "@/app/_lib/dataService";
import { formatNumberForCompactDisplay } from "@/app/_lib/helper";

async function InventorySummary({ inventory, inventoryMovement }) {
  const inventoryValue = inventory.reduce((acc, inventoryItem) => {
    const costPerBox =
      inventoryMovement.find(
        (mov) =>
          mov.product_id === inventoryItem.product_id &&
          mov.category === inventoryItem.category,
      )?.cost_per_box ?? 0;

    return acc + Number(inventoryItem.quantity_boxes) * Number(costPerBox);
  }, 0);

  let totalCartonInInventory = 0;

  for (const inventoryItem of inventory) {
    const productPackaging = await getProductPackagingByIdAndCategory(
      inventoryItem.product_id,
      inventoryItem.category,
    );

    const boxesPerCarton = Number(productPackaging?.boxes_per_carton ?? 0);

    if (!boxesPerCarton) continue;

    const cartons = Math.floor(
      Number(inventoryItem.quantity_boxes) / boxesPerCarton,
    );

    totalCartonInInventory += cartons;
  }

  return (
    <div className="grid grid-cols-3 gap-5 ">
      <InventoryCard
        title="Total Products"
        value={inventory.length.toLocaleString()}
        description="Products currently in inventory"
        icon={Package}
        iconClass="bg-blue-50 text-blue-600"
      />

      <InventoryCard
        title="Total Stock"
        value={totalCartonInInventory.toLocaleString()}
        description="Total cartons currently available"
        icon={Boxes}
        iconClass="bg-orange-50 text-orange-600"
      />

      <InventoryCard
        title="Inventory Value"
        value={`Rs. ${formatNumberForCompactDisplay.format(inventoryValue)}`}
        description="Current value of available stock"
        icon={Wallet}
        iconClass="bg-emerald-50 text-emerald-600"
        valueClass="text-emerald-600"
      />
    </div>
  );
}

function InventoryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  valueClass = "text-slate-800",
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-[0_0_6px_0_rgba(0,0,0,0.12)]">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={26} strokeWidth={1.8} />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-600">{title}</p>

          <p className={`mt-1 text-2xl font-bold ${valueClass}`}>{value}</p>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default InventorySummary;
