function MovementsPagination() {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">1–4</span> of{" "}
        <span className="font-medium text-slate-700">248</span> movements
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2
                text-sm text-slate-500 hover:bg-slate-50"
        >
          Previous
        </button>

        <button
          type="button"
          className="rounded-lg bg-primary-500 px-3 py-2
                text-sm font-medium text-white"
        >
          1
        </button>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2
                text-sm text-slate-700 hover:bg-slate-50"
        >
          2
        </button>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2
                text-sm text-slate-700 hover:bg-slate-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MovementsPagination;
