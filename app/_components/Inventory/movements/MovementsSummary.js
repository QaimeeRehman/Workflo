import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

function MovementsSummary({ movements }) {
  const totalMovements = movements.length;
  const boxesAdded = movements.reduce((acc, mov) => {
    if (mov.movement_type === "stock_in") return acc + mov.quantity_boxes;
    return acc;
  }, 0);
  const boxesRemoved = movements.reduce((acc, mov) => {
    if (mov.movement_type !== "stock_in")
      return acc + Math.abs(mov.quantity_boxes);
    return acc;
  }, 0);
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <SummaryCard
        title="Total Movements"
        value={totalMovements}
        description="All recorded movements"
      />

      <SummaryCard
        title="Stock In"
        value={boxesAdded}
        description="Boxes added"
        icon={<ArrowDownToLine size={18} />}
      />

      <SummaryCard
        title="Stock Out"
        value={boxesRemoved}
        description="Boxes removed"
        icon={<ArrowUpFromLine size={18} />}
      />
    </div>
  );
}

function SummaryCard({ title, value, description, icon }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        {icon && <div className="text-slate-400">{icon}</div>}
      </div>

      <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

export default MovementsSummary;
