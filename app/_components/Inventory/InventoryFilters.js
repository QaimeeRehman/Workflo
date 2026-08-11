function InventoryFilters() {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search product..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3
              outline-none transition placeholder:text-slate-400
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />

        <select
          className="rounded-lg border border-slate-300 px-4 py-3
              text-slate-700 outline-none focus:border-primary-500"
        >
          <option value="">All Categories</option>
          <option value="tp">TP</option>
          <option value="sp">SP</option>
          <option value="mp">MP</option>
          <option value="hr">HR</option>
          <option value="cake">Cake</option>
        </select>

        <select
          className="rounded-lg border border-slate-300 px-4 py-3
              text-slate-700 outline-none focus:border-primary-500"
        >
          <option value="">All Stock</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
    </div>
  );
}

export default InventoryFilters;
