"use client";
function BillInvoiceActions() {
  function handlePrint() {
    window.print();
  }
  return (
    <div className="no-print flex gap-3">
      <button
        type="button"
        onClick={handlePrint}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        🖨 Print
      </button>

      <button
        type="button"
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        WhatsApp
      </button>

      <button
        type="button"
        className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        Email
      </button>
    </div>
  );
}

export default BillInvoiceActions;
