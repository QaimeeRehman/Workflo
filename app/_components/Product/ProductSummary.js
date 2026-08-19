function PricingSummary({ totalProducts }) {
  return (
    <div className="grid grid-cols-8 gap-5">
      <div className="rounded-xl bg-white p-5 shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
        <p className="text-sm font-medium text-slate-500 ">Total Products</p>

        <p className="mt-2 text-3xl font-bold text-slate-800">
          {totalProducts}
        </p>
      </div>

      {/* <div className="rounded-xl bg-white p-5  shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
        <p className="text-sm font-medium text-slate-500">Biscuits</p>

        <p className="mt-2 text-3xl font-bold text-slate-800">
          {totalBiscuitProducts}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5  shadow-[0_0_6px_0_rgba(0,0,0,0.2)]">
        <p className="text-sm font-medium text-slate-500">Cakes</p>

        <p className="mt-2 text-3xl font-bold text-slate-800">
          {totalCakeProducts}
        </p>
      </div> */}
    </div>
  );
}

export default PricingSummary;
