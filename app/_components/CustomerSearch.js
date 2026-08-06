function CustomerSearch() {
  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Enter Customer ID..."
        className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
      />

      <button className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700">
        Search
      </button>

      <button className="rounded-lg border px-6 hover:bg-slate-100">
        Walk-in
      </button>
    </div>
  );
}

export default CustomerSearch;
