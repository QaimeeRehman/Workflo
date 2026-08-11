"use client";

function QuantityInformation({ onUnitChange, onQuantityChange, unit }) {
  return (
    <>
      {/* Quantity */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Quantity
        </label>

        <input
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          type="number"
          min="1"
          step="1"
          required
          placeholder="e.g. 10"
          className="w-full rounded-lg border border-slate-300 px-4 py-3
                  text-slate-800 outline-none transition
                  placeholder:text-slate-400
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />
      </div>
      {/* Unit */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Unit
        </label>

        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3
                  text-slate-800 outline-none transition
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        >
          <option value="carton">Cartons</option>
          <option value="box">Boxes</option>
        </select>
      </div>
    </>
  );
}

export default QuantityInformation;
