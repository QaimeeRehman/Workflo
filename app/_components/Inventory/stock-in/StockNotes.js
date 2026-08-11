function StockNotes() {
  return (
    <section className="p-6">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Notes
      </label>

      <textarea
        name="notes"
        rows="3"
        placeholder="Optional notes about this stock receipt..."
        className="w-full resize-none rounded-lg border border-slate-300
              px-4 py-3 text-slate-800 outline-none transition
              placeholder:text-slate-400
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
      />
    </section>
  );
}

export default StockNotes;
