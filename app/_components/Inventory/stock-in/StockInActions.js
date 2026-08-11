import CRUDButton from "../../CRUDButton";
import Link from "next/link";
function StockInActions({ addItem }) {
  return (
    <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
      <Link
        href="/inventory"
        type="button"
        className="rounded-lg border border-slate-300 bg-white px-5 py-3
              font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Cancel
      </Link>

      <button
        type="button"
        onClick={addItem}
        className="rounded-lg bg-primary-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-500"
      >
        + Add Product
      </button>

      <CRUDButton>Add Stock</CRUDButton>
    </div>
  );
}

export default StockInActions;
