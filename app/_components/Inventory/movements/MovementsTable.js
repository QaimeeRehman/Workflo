import {
  convertBoxesIntoCartonAndBoxes,
  getBillById,
  getSupplierInvoiceItemById,
} from "@/app/_lib/dataService";
import { toCapitalize } from "@/app/_lib/helper";
import { format } from "date-fns";
import Link from "next/link";

function MovementsTable({ movements }) {
  async function getMovementReference(movement) {
    switch (movement.reference_type) {
      case "supplier_invoice_item": {
        const item = await getSupplierInvoiceItemById(movement.reference_id);

        return item?.supplier_invoice?.invoice_number ?? "—";
      }

      case "bills": {
        const item = await getBillById(movement.reference_id);
        console.log(item);
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
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-4 font-semibold text-slate-600">Date</th>

              <th className="px-5 py-4 font-semibold text-slate-600">
                Product
              </th>

              <th className="px-5 py-4 font-semibold text-slate-600">
                Category
              </th>

              <th className="px-5 py-4 font-semibold text-slate-600">
                Movement
              </th>

              <th className="px-5 py-4 text-right font-semibold text-slate-600">
                Quantity
              </th>

              <th className="px-5 py-4 text-right font-semibold text-slate-600">
                Cost / Box
              </th>

              <th className="px-5 py-4 font-semibold text-slate-600">
                Reference
              </th>
              <th className="px-5 py-4 font-semibold text-slate-600">
                Created by
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {movements.map(async (mov) => {
              const reference = await getMovementReference(mov);
              const { boxes, cartons } = await convertBoxesIntoCartonAndBoxes(
                mov.product_id,
                mov.category,
                mov.quantity_boxes,
              );
              return (
                <MovementRow
                  key={mov.id}
                  date={format(new Date(mov.created_at), "MMM dd, yyyy")}
                  time={format(new Date(mov.created_at), "hh:mm a")}
                  product={toCapitalize(mov.product.name)}
                  category={mov.category}
                  movement={mov.movement_type}
                  cartons={`${mov.movement_type === "stock_in" ? "+" : ""}${cartons}`}
                  boxes={`${mov.movement_type === "stock_in" ? "+" : ""}${boxes}`}
                  cost={mov.cost_per_box}
                  reference={reference}
                  type={mov.movement_type.split("_").pop()}
                  created_by={toCapitalize(mov.user.fullName)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MovementRow({
  date,
  time,
  product,
  category,
  movement,
  cartons,
  boxes,
  cost,
  reference,
  type,
  created_by,
}) {
  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <p className="font-medium text-slate-700">{date}</p>
        <p className="mt-0.5 text-xs text-slate-400">{time}</p>
      </td>

      <td className="px-5 py-4">
        <p className="font-medium text-slate-800">{product}</p>
      </td>

      <td className="px-5 py-4">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase text-slate-600">
          {category}
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            type === "in"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {movement}
        </span>
      </td>

      <td
        className={`px-5 py-4 text-right font-semibold ${
          type === "in" ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {cartons > 0 && <p className="font-semibold">{cartons} cartons</p>}

        {Number(boxes) > 0 && <p className="mt-1 text-xs">{boxes} boxes</p>}
      </td>

      <td className="px-5 py-4 text-right text-slate-700">
        {cost ? `Rs. ${Number(cost).toLocaleString()}` : "—"}
      </td>

      <td className="px-5 py-4">
        <span className="font-medium text-primary-600">{reference}</span>
      </td>
      <td className="px-5 py-4">
        <span className="font-medium text-primary-600">{created_by}</span>
      </td>
    </tr>
  );
}

export default MovementsTable;
