"use client";

function CostInformation({ onCostPerBoxChange, totalCost, costPerBox }) {
  return (
    <>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Cost per Box
        </label>

        <input
          type="number"
          min="0"
          value={costPerBox}
          onChange={(e) => onCostPerBoxChange(Number(e.target.value))}
          placeholder="e.g. 330"
          className="w-full rounded-lg border border-slate-300 px-4 py-3
                  text-slate-800 outline-none transition
                  placeholder:text-slate-400
                  focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
        />
      </div>

      {totalCost !== 0 && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Total cost
          </label>

          <p className="text-lg font-semibold text-slate-800">
            Rs {totalCost.toLocaleString()}
          </p>
        </div>
      )}
    </>
  );
}

export default CostInformation;
