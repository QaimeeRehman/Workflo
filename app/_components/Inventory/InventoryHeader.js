import Link from "next/link";
function InventoryHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Inventory</h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor your current stock and inventory levels.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/inventory/movements"
          className="rounded-lg border border-slate-300 bg-white px-5 py-3
              font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Movements
        </Link>

        <Link
          href="/inventory/stock-in"
          className="rounded-lg bg-primary-500 px-5 py-3
              font-medium text-white transition hover:bg-primary-900"
        >
          + Stock In
        </Link>
      </div>
    </div>
  );
}

export default InventoryHeader;
