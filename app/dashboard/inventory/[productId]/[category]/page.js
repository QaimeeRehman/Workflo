import {
  convertBoxesIntoCartonAndBoxes,
  getBillById,
  getBillItemsByBillId,
  getFilteredInventory,
  getInventoryMovementByIdAndCategory,
  getProductPackagingByIdAndCategory,
  getSupplierInvoiceItemById,
} from "@/app/_lib/dataService";
import { toCapitalize } from "@/app/_lib/helper";
import { format } from "date-fns";
import Link from "next/link";
async function page({ params }) {
  // { inventory, movements }
  const { productId, category } = await params;
  const [inventory] = await getFilteredInventory(
    undefined,
    category,
    undefined,
    productId,
  );
  const movements = await getInventoryMovementByIdAndCategory(
    productId,
    category,
  );

  const packaging = await getProductPackagingByIdAndCategory(
    productId,
    category,
  );
  const totalStockReceived = movements.reduce((total, movement) => {
    if (movement.movement_type === "stock_in") {
      return total + Number(movement.quantity_boxes);
    }

    return total;
  }, 0);
  const currentTotalStockInBoxes = inventory.quantity_boxes;
  const currentTotalStockInCartons =
    currentTotalStockInBoxes / packaging.boxes_per_carton;
  const latestMovement = movements
    .filter(
      (movement) =>
        movement.product_id === inventory.product_id &&
        movement.category === inventory.category &&
        movement.movement_type === "stock_in",
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

  const costPerBox = latestMovement?.cost_per_box ?? null;
  const totalStockValue =
    Number(inventory.quantity_boxes) * Number(costPerBox) || "-";
  async function getMovementReference(movement) {
    switch (movement.reference_type) {
      case "supplier_invoice_item": {
        const item = await getSupplierInvoiceItemById(movement.reference_id);
        return item?.supplier_invoice?.invoice_number ?? "—";
      }

      case "bills": {
        const item = await getBillById(movement.reference_id);

        return item?.invoice_number ?? "—";
      }

      //   case "stock_adjustment": {
      //     const adjustment = await getStockAdjustmentById(movement.reference_id);

      //     return adjustment?.reference_number ?? "—";
      //   }

      default:
        return "—";
    }
  }

  const movementRows = await Promise.all(
    movements.map(async (movement) => {
      const reference = await getMovementReference(movement);

      const { boxes, cartons } = await convertBoxesIntoCartonAndBoxes(
        movement.product_id,
        movement.category,
        movement.quantity_boxes,
      );

      return {
        ...movement,
        reference,
        boxes,
        cartons,
      };
    }),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1 text-sm text-slate-500">
            Inventory / Product History
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            {toCapitalize(inventory.product.name)}
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-semibold uppercase text-primary-700">
              {inventory.category}
            </span>

            <span className="text-sm text-slate-500">
              Product ID: {inventory.product.id}
            </span>
          </div>
        </div>

        <Link
          href="/dashboard/inventory"
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          ← Back to Inventory
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4 min-w-[80vw]">
        <SummaryCard
          label="Current Boxes Stock"
          value={`${currentTotalStockInBoxes}`}
        />

        <SummaryCard
          label="Current Cartons Stock"
          value={`${Math.trunc(currentTotalStockInCartons)}`}
        />

        <SummaryCard
          label="Total Recieved"
          value={`${Number(totalStockReceived / packaging.boxes_per_carton).toLocaleString()} cartons`}
        />

        <SummaryCard
          label="Latest Cost"
          value={`Rs. ${Number(costPerBox).toLocaleString()}`}
          suffix="/ box"
        />

        <SummaryCard
          label="Inventory Value"
          value={`Rs. ${totalStockValue.toLocaleString()}`}
        />
      </div>

      {/* Movement History */}
      <section className="overflow-hidden rounded-xl bg-white shadow">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">Movement History</h2>

          <p className="mt-1 text-sm text-slate-500">
            Complete stock movement history for this product.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-medium text-slate-600">Date</th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Movement
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Quantity
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Cost / Box
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Reference
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Performed By
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {movementRows.length > 0 ? (
                movementRows.map((movement) => {
                  const isStockIn = movement.movement_type === "stock_in";
                  const reference = movement.reference;
                  const boxes = movement.boxes;
                  const cartons = movement.cartons;
                  return (
                    <tr
                      key={movement.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-700">
                          {format(
                            new Date(movement.created_at),
                            "MMM dd, yyyy",
                          )}
                        </div>

                        <div className="mt-0.5 text-xs text-slate-400">
                          {format(new Date(movement.created_at), "hh:mm a")}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isStockIn
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {isStockIn ? "Stock In" : "Stock Out"}
                        </span>
                      </td>

                      <td
                        className={`px-5 py-4 font-semibold   ${
                          movement.movement_type === "stock_in"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {Number(cartons) > 0 && (
                          <p className="font-semibold">
                            {isStockIn ? "+" : "-"}
                            {cartons} cartons
                          </p>
                        )}
                        {Number(boxes) > 0 && (
                          <p className="mt-1 text-xs">
                            {isStockIn ? "+" : "-"}
                            {boxes} boxes
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {movement.cost_per_box
                          ? `Rs. ${Number(
                              movement.cost_per_box,
                            ).toLocaleString()}`
                          : "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-medium text-primary-600">
                          {reference ?? "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {movement.user?.fullName ?? "—"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-slate-500"
                  >
                    No movement history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, suffix }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <div className="mt-2 flex items-baseline gap-1">
        <p className="text-2xl font-bold text-slate-800">{value}</p>

        {suffix && <span className="text-sm text-slate-400">{suffix}</span>}
      </div>
    </div>
  );
}

export default page;
