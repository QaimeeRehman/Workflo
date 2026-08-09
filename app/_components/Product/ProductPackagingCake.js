function ProductPackagingCake({ packaging }) {
  return (
    <div className="rounded-xl bg-white shadow">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-800">Packaging</h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure the number of units in a box and boxes in a carton.
        </p>
      </div>

      {/* Packaging */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Units per Box */}
          <div>
            <label
              htmlFor="cake-units"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              Units per Box
            </label>

            <input
              id="cake-units"
              name="cake_units_per_box"
              type="number"
              min="1"
              defaultValue={packaging?.cake?.units_per_box ?? ""}
              placeholder="e.g. 12"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Number of individual cakes inside one box.
            </p>
          </div>

          {/* Boxes per Carton */}
          <div>
            <label
              htmlFor="cake-carton"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              Boxes per Carton
            </label>

            <input
              id="cake-carton"
              name="cake_boxes_per_carton"
              type="number"
              min="1"
              defaultValue={packaging?.cake.boxes_per_carton ?? ""}
              placeholder="e.g. 6"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Number of boxes inside one carton.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-600">
            Packaging structure
          </p>

          <p className="mt-1 text-sm text-slate-500">
            1 carton → {packaging?.boxes_per_carton ?? "-"} boxes →{" "}
            {packaging?.units_per_box ?? "-"} units per box
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPackagingCake;
