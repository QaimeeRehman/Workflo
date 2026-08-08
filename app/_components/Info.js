function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-medium text-slate-800">{value}</p>
    </div>
  );
}

export default Info;
