function PriceInput({ label, name, value }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
          Rs.
        </span>

        <input
          id={name}
          name={name}
          type="number"
          step="0.01"
          defaultValue={value ?? ""}
          placeholder="0.00"
          className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />
      </div>
    </div>
  );
}

export default PriceInput;
