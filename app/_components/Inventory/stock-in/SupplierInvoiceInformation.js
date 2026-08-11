function SupplierInvoiceInformation() {
  return (
    <section className="border-b border-slate-200">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="font-semibold text-slate-800">Supplier Invoice</h2>

        <p className="mt-1 text-sm text-slate-500">
          Record the supplier invoice associated with this stock receipt.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 p-5">
        {/* Supplier */}
        <div>
          <label
            htmlFor="supplier"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Supplier
          </label>

          <input
            id="supplier"
            name="supplier"
            type="text"
            required
            placeholder="Supplier name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3
              text-slate-800 outline-none transition
              placeholder:text-slate-400
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Invoice Number */}
        <div>
          <label
            htmlFor="invoice_number"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Invoice Number
          </label>

          <input
            id="invoice_number"
            name="invoice_number"
            type="text"
            required
            placeholder="e.g. INV-4521"
            className="w-full rounded-lg border border-slate-300 px-4 py-3
              text-slate-800 outline-none transition
              placeholder:text-slate-400
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Invoice Date */}
        <div>
          <label
            htmlFor="invoice_date"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Invoice Date
          </label>

          <input
            id="invoice_date"
            name="invoice_date"
            type="date"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3
              text-slate-800 outline-none transition
              focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Invoice File */}
        <div>
          <label
            htmlFor="invoice_file"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Invoice File
          </label>

          <input
            id="invoice_file"
            name="invoice_file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full rounded-lg border border-slate-300 px-4 py-3
              text-sm text-slate-700 outline-none
              file:mr-4 file:rounded-md file:border-0
              file:bg-slate-100 file:px-3 file:py-2
              file:text-sm file:font-medium
              file:text-slate-700
              hover:file:bg-slate-200"
          />

          <p className="mt-2 text-xs text-slate-500">PDF, JPG, JPEG or PNG.</p>
        </div>
      </div>
    </section>
  );
}

export default SupplierInvoiceInformation;
