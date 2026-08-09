import { CircleDollarSign } from "lucide-react";

function ProductPricingBiscuitView({ pricing }) {
  return (
    <div className="rounded-2xl bg-white shadow">
      <div className="flex items-center gap-3 border-b p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
          <CircleDollarSign size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">Pricing</h2>

          <p className="text-sm text-slate-500">
            Unit selling prices according to customer category.
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Pricing Header */}
        <div className="mb-3 grid grid-cols-5  rounded-lg bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600">
          <div>Category</div>
          <div>Retail Filer</div>
          <div>Retail Non-Filer</div>
          <div>Wholesale Filer</div>
          <div>Wholesale Non-Filer</div>
        </div>

        {/* Pricing Rows */}
        {Object.entries(pricing).map(([category, prices]) => (
          <div
            key={category}
            className="grid grid-cols-5 items-center border-b px-5 py-4 last:border-0"
          >
            <div>
              <span className="rounded-md bg-primary-100 px-3 py-1 text-sm font-bold uppercase text-primary-700">
                {category}
              </span>
            </div>

            <Price value={prices.retail_filer} />
            <Price value={prices["retail_non-filer"]} />
            <Price value={prices.wholesale_filer} />
            <Price value={prices["wholesale_non-filer"]} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Price({ value }) {
  return (
    <div className="font-semibold text-slate-800">
      {value > 0 ? `Rs. ${value.toFixed(2)}` : "—"}
    </div>
  );
}
export default ProductPricingBiscuitView;
