import {
  getProductById,
  getProductPackagingByIdAndCategory,
} from "@/app/_lib/dataService";
import { toCapitalize } from "@/app/_lib/helper";

function InventoryTableItem({ inventory, inventoryMovement }) {
  if (inventory.length === 0)
    return (
      <p className="text-center py-4 text-slate-400">
        No Products in inventory...
      </p>
    );

  return (
    <>
      {inventory.map(async (inventoryItem) => {
        const product = await getProductById(inventoryItem.product_id);
        const costPerBox = inventoryMovement.find(
          (mov) =>
            mov.product_id === inventoryItem.product_id &&
            mov.category === inventoryItem.category,
        )?.cost_per_box;
        const productPackaging = await getProductPackagingByIdAndCategory(
          product.id,
          inventoryItem.category,
        );
        const boxesPerCarton = productPackaging.boxes_per_carton;
        const carton = Math.floor(
          Number(inventoryItem.quantity_boxes) / Number(boxesPerCarton),
        );
        const boxes =
          Number(inventoryItem.quantity_boxes) % Number(boxesPerCarton);
        const cartonCost = Number(costPerBox) * Number(boxesPerCarton);
        const totalCost =
          Number(costPerBox) * Number(inventoryItem.quantity_boxes);
        return (
          <InventoryRow
            key={inventoryItem.id}
            product={toCapitalize(product.name?.split(" "))}
            category={inventoryItem.category.toUpperCase()}
            cartons={carton}
            boxes={boxes}
            cost={`Rs ${cartonCost.toLocaleString()}`}
            value={`Rs ${totalCost.toLocaleString()}`}
          />
        );
      })}
    </>
  );
}

function InventoryRow({ product, category, cartons, boxes, cost, value }) {
  return (
    <div
      className="grid grid-cols-6 items-center border-t border-slate-100
        px-6 py-5 text-sm"
    >
      {/* Product */}
      <div className="col-span-2">
        <p className="font-semibold text-slate-800">{product}</p>

        <p className="mt-1 text-xs text-slate-400">View inventory details</p>
      </div>

      {/* Category */}
      <div>
        <span
          className="rounded-md bg-slate-100 px-3 py-1
            text-xs font-semibold text-slate-600"
        >
          {category}
        </span>
      </div>

      {/* Stock */}
      <div>
        <p className="font-semibold text-slate-800">{cartons} cartons</p>

        {Number(boxes) > 0 && (
          <p className="mt-1 text-xs text-slate-400">+ {boxes} boxes</p>
        )}
      </div>

      {/* Cost */}
      <div className="font-medium text-slate-700">{cost}</div>

      {/* Value */}
      <div className="font-semibold text-slate-800">{value}</div>
    </div>
  );
}
export default InventoryTableItem;
