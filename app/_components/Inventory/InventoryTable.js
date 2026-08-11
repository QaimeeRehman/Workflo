function InventoryTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      {/* Table Header */}
      <div className="grid grid-cols-6 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600">
        <div className="col-span-2">Product</div>
        <div>Category</div>
        <div>Stock</div>
        <div>Cost / Carton</div>
        <div>Stock Value</div>
      </div>

      <InventoryRow
        product="Sooper Chocolate"
        category="TP"
        cartons="12"
        boxes="8"
        cost="Rs 5,200"
        value="Rs 66,560"
      />

      <InventoryRow
        product="Sooper Chocolate"
        category="SP"
        cartons="20"
        boxes="0"
        cost="Rs 4,800"
        value="Rs 96,000"
      />

      <InventoryRow
        product="Cake Up RS 30"
        category="Cake"
        cartons="8"
        boxes="3"
        cost="Rs 2,400"
        value="Rs 20,400"
      />

      <InventoryRow
        product="Gluco Teddy"
        category="MP"
        cartons="2"
        boxes="4"
        cost="Rs 3,100"
        value="Rs 7,440"
      />
    </div>
  );
}

function InventoryRow({ product, category, cartons, boxes, cost, value }) {
  return (
    <div
      className="grid grid-cols-6 items-center border-t border-slate-100
        px-6 py-5 text-sm"
    >
      {/* Product */}
      <div className="col-span-2">
        <p className="font-semibold text-slate-800">{product}</p>

        <p className="mt-1 text-xs text-slate-400">View inventory details</p>
      </div>

      {/* Category */}
      <div>
        <span
          className="rounded-md bg-slate-100 px-3 py-1
            text-xs font-semibold text-slate-600"
        >
          {category}
        </span>
      </div>

      {/* Stock */}
      <div>
        <p className="font-semibold text-slate-800">{cartons} cartons</p>

        {Number(boxes) > 0 && (
          <p className="mt-1 text-xs text-slate-400">+ {boxes} boxes</p>
        )}
      </div>

      {/* Cost */}
      <div className="font-medium text-slate-700">{cost}</div>

      {/* Value */}
      <div className="font-semibold text-slate-800">{value}</div>
    </div>
  );
}

export default InventoryTable;
