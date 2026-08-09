function ProductPackagingCakeView({ packaging }) {
  console.log(packaging);

  return (
    <div className="rounded-xl bg-white shadow">
      {/* Header */}
      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-800">Packaging</h2>

        <p className="mt-1 text-sm text-slate-500">
          Define box and carton quantities for this cake.
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-5">
          <PackageCard
            title="Box"
            value={packaging?.cake.units_per_box}
            description="Units per box"
          />

          <PackageCard
            title="Carton"
            value={packaging?.cake.boxes_per_carton}
            description="Boxes per carton"
          />
        </div>
      </div>
    </div>
  );
}

function PackageCard({ title, value, description }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-bold text-slate-800">{value ?? "-"}</p>

      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export default ProductPackagingCakeView;
