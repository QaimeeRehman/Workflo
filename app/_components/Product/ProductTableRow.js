import { toCapitalize } from "@/app/_lib/helper";
import PricingActions from "./ProductActions";
function PricingTableRow({ product }) {
  return (
    <tr className="border-b border-gray-300 last:border-0 transition hover:bg-slate-100">
      {/* ID */}
      <td className="px-6 py-5 text-sm text-slate-500">#{product.id}</td>

      {/* Product */}
      <td className="px-6 py-5">
        <p className="font-semibold text-slate-800">
          {toCapitalize(product.name)}
        </p>
      </td>

      {/* Type */}
      <td className="px-6 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            product.type === "biscuit"
              ? "bg-blue-100 text-blue-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {product.type.toUpperCase()}
        </span>
      </td>

      {/* Company */}
      <td className="px-6 py-5 text-sm text-slate-600">
        {product.company.toUpperCase()}
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <PricingActions product={product} />
      </td>
    </tr>
  );
}

export default PricingTableRow;
