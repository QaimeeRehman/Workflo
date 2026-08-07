function CustomersFilters() {
  return (
    <div className="rounded-xl bg-white p-5 border border-gray-200">
      <div className="grid grid-cols-4 gap-20">
        <input
          type="text"
          placeholder="Search by name, phone or CNIC..."
          className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
        />

        <select className="rounded-lg border px-4 py-3">
          <option>All Areas</option>
        </select>

        <select className="rounded-lg border px-4 py-3">
          <option>All Sale Types</option>
          <option>Retail</option>
          <option>Wholesale</option>
        </select>

        <select className="rounded-lg border px-4 py-3">
          <option>All Tax Categories</option>
          <option>Filer</option>
          <option>Non-Filer</option>
        </select>
      </div>
    </div>
  );
}

export default CustomersFilters;
