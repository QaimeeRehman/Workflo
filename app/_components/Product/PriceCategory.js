import PriceInput from "./PriceInput";

const saleTypes = [
  {
    key: "retail_filer",
    label: "Retail — Filer",
  },
  {
    key: "retail_non_filer",
    label: "Retail — Non-Filer",
  },
  {
    key: "wholesale_filer",
    label: "Wholesale — Filer",
  },
  {
    key: "wholesale_non_filer",
    label: "Wholesale — Non-Filer",
  },
];

function PriceCategory({ title, prefix, pricing }) {
  const categoryPricing = pricing?.[prefix] ?? {};

  return (
    <div className="rounded-xl border border-slate-200">
      {/* Category Header */}
      <div className="border-b bg-slate-50 px-5 py-4">
        <h3 className="font-semibold uppercase text-slate-700">{title}</h3>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-5 p-5">
        {saleTypes.map(({ key, label }) => {
          const fieldName = `${prefix}_${key}`;

          return (
            <PriceInput
              key={fieldName}
              label={label}
              name={fieldName}
              value={categoryPricing[key]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PriceCategory;
