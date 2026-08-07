function NewCustomerFormActions() {
  return (
    <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
      <button
        type="reset"
        className="rounded-lg border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Reset
      </button>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Save Customer
      </button>
    </div>
  );
}

export default NewCustomerFormActions;
