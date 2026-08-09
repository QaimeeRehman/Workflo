function ProductPackagingBiscuitView({ packaging }) {
  console.log(packaging);
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
        <div className="grid grid-cols-5 rounded-lg bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600">
          <div>Category</div>
          <div>Units per Box</div>
          <div>Boxes per Carton</div>
        </div>
        {/* TP */}
        {/* <PackagingRow
          category="TP"
          unitsPerBox={packaging.tp.units_per_box}
          boxesPerCarton={packaging.tp.boxes_per_carton}
        /> */}
        {/* SP */}
        {/* <PackagingRow
          category="SP"
          unitsPerBox={packaging.sp.units_per_box}
          boxesPerCarton={packaging.sp.boxes_per_carton}
        /> */}
        {/* MP */}
        {/* <PackagingRow
          category="MP"
          unitsPerBox={packaging.mp.units_per_box}
          boxesPerCarton={packaging.mp.boxes_per_carton}
        /> */}
        {/* HR */}
        {/* <PackagingRow
          category="HR"
          unitsPerBox={packaging.hr.units_per_box}
          boxesPerCarton={packaging.hr.boxes_per_carton}
        /> */}
      </div>
    </div>
  );
}
function PackagingRow({ category, unitsPerBox, boxesPerCarton }) {
  return (
    <div className="grid grid-cols-5 items-center border-b px-5 py-4 last:border-0">
      {/* Category */}
      <div>
        <span className="rounded-md bg-primary-100 px-3 py-1 text-sm font-bold text-primary-700">
          {category}
        </span>
      </div>

      {/* Units per Box */}
      <div className="font-medium text-slate-800">{unitsPerBox} units</div>

      {/* Boxes per Carton */}
      <div className="font-medium text-slate-800">{boxesPerCarton} boxes</div>
    </div>
  );
}

export default ProductPackagingBiscuitView;
