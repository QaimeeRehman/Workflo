import { CircleDollarSign } from "lucide-react";
import PriceCategory from "./PriceCategory";

function ProductPricingBiscuit({ pricing }) {
  return (
    <section className="rounded-2xl bg-white shadow">
      <div className="flex items-center gap-3 border-b p-7">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
          <CircleDollarSign size={22} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Biscuit Pricing
          </h2>

          <p className="text-sm text-slate-500">
            Set prices according to category, sale type and tax status.
          </p>
        </div>
      </div>

      <div className="space-y-8 p-7">
        <PriceCategory title="TP" prefix="tp" pricing={pricing} />

        <PriceCategory title="SP" prefix="sp" pricing={pricing} />

        <PriceCategory title="MP" prefix="mp" pricing={pricing} />

        <PriceCategory title="HR" prefix="hr" pricing={pricing} />
      </div>
    </section>
  );
}

export default ProductPricingBiscuit;
