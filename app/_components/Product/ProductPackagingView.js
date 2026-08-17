function ProductPackagingView({ packaging }) {
  return (
    <div className="rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold text-slate-800">Packaging</h2>

        <p className="mt-1 text-sm text-slate-500">
          Define box and carton quantities for each product category.
        </p>
      </div>

      <div className="p-6">
        {/* Table Header */}
        <div className="grid grid-cols-3 rounded-lg bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600">
          <div>Category</div>
          <div>Units per Box</div>
          <div>Boxes per Carton</div>
        </div>

        {/* Packaging Rows */}
        {Object.entries(packaging ?? {}).map(
          ([category, { units_per_box, boxes_per_carton }]) => (
            <PackagingRow
              key={category}
              category={category}
              unitsPerBox={units_per_box}
              boxesPerCarton={boxes_per_carton}
            />
          ),
        )}
      </div>
    </div>
  );
}

function PackagingRow({ category, unitsPerBox, boxesPerCarton }) {
  return (
    <div className="grid grid-cols-3 items-center border-b px-5 py-4 last:border-0">
      {/* Category */}
      <div>
        <span className="rounded-md bg-primary-100 px-3 py-1 text-sm font-bold uppercase text-primary-700">
          {category}
        </span>
      </div>

      {/* Units per Box */}
      <div className="font-medium text-slate-800">
        {unitsPerBox != null ? `${unitsPerBox} units` : "—"}
      </div>

      {/* Boxes per Carton */}
      <div className="font-medium text-slate-800">
        {boxesPerCarton != null ? `${boxesPerCarton} boxes` : "—"}
      </div>
    </div>
  );
}

export default ProductPackagingView;
