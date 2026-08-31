function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800">{label}</p>

        {description && (
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-slate-900" : "bg-slate-200"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow-sm transition ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default ToggleRow;
