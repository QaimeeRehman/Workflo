function BillInvoiceActions() {
  return (
    <>
      <button className="mt-8 w-full rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white hover:bg-blue-700">
        Save Invoice
      </button>

      <button className="mt-3 w-full rounded-lg border py-4 hover:bg-slate-100">
        Print Invoice
      </button>

      <button className="mt-3 w-full rounded-lg border py-4 hover:bg-slate-100">
        New Invoice
      </button>
    </>
  );
}

export default BillInvoiceActions;
