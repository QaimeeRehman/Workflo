function InventorySummary() {
  return (
    <div className="grid grid-cols-4 gap-5">
      <InventoryCard
        title="Total Products"
        value="128"
        description="Products in inventory"
      />

      <InventoryCard title="Total Stock" value="2,840" description="Cartons" />

      <InventoryCard
        title="Inventory Value"
        value="Rs 8.4M"
        description="Current stock value"
      />

      <InventoryCard
        title="Low Stock"
        value="12"
        description="Products need attention"
      />
    </div>
  );
}

function InventoryCard({ title, value, description }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.2)] ">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

export default InventorySummary;
