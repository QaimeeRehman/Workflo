import { Check, Save } from "lucide-react";

function SettingsCard({ title, description, children, onSave, saved }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <div className="px-5 py-6 sm:px-6">{children}</div>

      {onSave && (
        <div className="flex items-center justify-end border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 active:bg-slate-950"
          >
            {saved ? (
              <>
                <Check size={16} />
                Saved
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default SettingsCard;
