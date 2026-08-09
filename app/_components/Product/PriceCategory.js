import PriceInput from "./PriceInput";

function PriceCategory({ title, prefix, pricing }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-md bg-primary-100 px-3 py-1 text-sm font-bold uppercase text-primary-700">
          {title}
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <PriceInput
          label="Retail — Filer"
          name={`${prefix}_retail_filer`}
          value={pricing[`${prefix}_retail_filer`]}
        />

        <PriceInput
          label="Retail — Non-Filer"
          name={`${prefix}_retail_non-filer`}
          value={pricing[`${prefix}_retail_non-filer`]}
        />

        <PriceInput
          label="Wholesale — Filer"
          name={`${prefix}_wholesale_filer`}
          value={pricing[`${prefix}_wholesale_filer`]}
        />

        <PriceInput
          label="Wholesale — Non-Filer"
          name={`${prefix}_wholesale_non-filer`}
          value={pricing[`${prefix}_wholesale_non-filer`]}
        />
      </div>
    </div>
  );
}

export default PriceCategory;
