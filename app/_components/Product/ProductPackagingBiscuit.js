function ProductPackaging({ packaging }) {
  // const packaging = {
  //   tp: {
  //     units_per_box: 12,
  //     boxes_per_carton: 8,
  //   },

  //   sp: {
  //     units_per_box: 24,
  //     boxes_per_carton: 6,
  //   },

  //   mp: {
  //     units_per_box: 12,
  //     boxes_per_carton: 10,
  //   },

  //   hr: {
  //     units_per_box: 6,
  //     boxes_per_carton: 12,
  //   },
  // };
  return (
    <div className="rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold text-slate-800">Packaging</h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure the number of units in a box and boxes in a carton for each
          category.
        </p>
      </div>

      {/* Packaging rows */}
      <div className="p-6">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-600">
            <div>Category</div>
            <div>Units per Box</div>
            <div>Boxes per Carton</div>
          </div>
          <PackagingRow
            category="TP"
            unitsPerBox={packaging.tp.units_per_box}
            boxesPerCarton={packaging.tp.boxes_per_carton}
          />
          <PackagingRow
            category="SP"
            unitsPerBox={packaging.sp.units_per_box}
            boxesPerCarton={packaging.sp.boxes_per_carton}
          />
          <PackagingRow
            category="MP"
            unitsPerBox={packaging.mp.units_per_box}
            boxesPerCarton={packaging.mp.boxes_per_carton}
          />
          <PackagingRow
            category="HR"
            unitsPerBox={packaging.hr.units_per_box}
            boxesPerCarton={packaging.hr.boxes_per_carton}
          />
        </div>
      </div>
    </div>
  );
}
function PackagingRow({ category, unitsPerBox, boxesPerCarton }) {
  const key = category.toLowerCase();

  return (
    <div className="grid grid-cols-3 items-center gap-6 border-t border-slate-200 px-5 py-5">
      {/* Category */}
      <div>
        <span className="inline-flex rounded-lg bg-primary-100 px-3 py-2 text-sm font-bold text-primary-700">
          {category}
        </span>
      </div>

      {/* Units per box */}
      <div>
        <label
          htmlFor={`${key}-units`}
          className="mb-2 block text-xs font-medium text-slate-500"
        >
          Units per Box
        </label>

        <input
          id={`${key}-units`}
          name={`${key}_units_per_box`}
          type="number"
          min="1"
          defaultValue={unitsPerBox ?? ""}
          placeholder="e.g. 12"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />
      </div>

      {/* Boxes per carton */}
      <div>
        <label
          htmlFor={`${key}-carton`}
          className="mb-2 block text-xs font-medium text-slate-500"
        >
          Boxes per Carton
        </label>

        <input
          id={`${key}-carton`}
          name={`${key}_boxes_per_carton`}
          type="number"
          min="1"
          defaultValue={boxesPerCarton ?? ""}
          placeholder="e.g. 8"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />
      </div>
    </div>
  );
}

export default ProductPackaging;
