import { CircleDollarSign } from "lucide-react";
import PriceInput from "./PriceInput";

function ProductPricingCake({ pricing }) {
  return (
    <section className="rounded-2xl bg-white shadow">
      <div className="flex items-center gap-3 border-b p-7">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
          <CircleDollarSign size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">Cake Pricing</h2>

          <p className="text-sm text-slate-500">
            Set prices according to customer type and tax category.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 p-7">
        <PriceInput
          label="Retail — Filer"
          name="retail_filer"
          value={pricing.retail_filer}
        />

        <PriceInput
          label="Retail — Non-Filer"
          name="retail_non-filer"
          value={pricing["retail_non-filer"]}
        />

        <PriceInput
          label="Wholesale — Filer"
          name="wholesale_filer"
          value={pricing.wholesale_filer}
        />

        <PriceInput
          label="Wholesale — Non-Filer"
          name="wholesale_non-filer"
          value={pricing["wholesale_non-filer"]}
        />
      </div>
    </section>
  );
}

export default ProductPricingCake;
