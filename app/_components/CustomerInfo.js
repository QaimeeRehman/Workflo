function CustomerInfo() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4">
      <div>
        <p className="text-sm text-slate-500">Customer</p>
        <p className="font-semibold">Abdul Rehman Traders</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Sale Type</p>
        <p className="font-semibold">Wholesale</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Tax Category</p>
        <p className="font-semibold">Filer</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Area</p>
        <p className="font-semibold">Market</p>
      </div>
    </div>
  );
}

export default CustomerInfo;
