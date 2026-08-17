function SummaryCard({ label, value, description }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

export default SummaryCard;
