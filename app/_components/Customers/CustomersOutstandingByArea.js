function CustomersOutstandingByArea({ data = [], totalOutstanding = 0 }) {
  const sortedData = [...data].sort((a, b) => b.outstanding - a.outstanding);

  const maxOutstanding = Math.max(
    ...sortedData.map((item) => item.outstanding),
    1,
  );

  return (
    <section className="rounded-xl bg-white p-6 shadow-[0_0_6px_0_rgba(0,0,0,0.12)]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Outstanding by Area
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Customer outstanding balances grouped by area.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-175">
          <thead>
            <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
              <th className="pb-4 font-medium">Area</th>

              <th className="w-[35%] pb-4 font-medium">Distribution</th>

              <th className="pb-4 text-right font-medium">Outstanding</th>

              <th className="pb-4 text-right font-medium">Customers Owing</th>

              <th className="pb-4 text-right font-medium">% of Total</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((area) => {
                const percentage =
                  totalOutstanding > 0
                    ? (area.outstanding / totalOutstanding) * 100
                    : 0;

                const progress = (area.outstanding / maxOutstanding) * 100;

                return (
                  <tr
                    key={area.area}
                    className="border-b border-slate-100 last:border-0"
                  >
                    {/* Area */}
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />

                        <span className="font-medium capitalize text-slate-700">
                          {area.area}
                        </span>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="py-5 pr-8">
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary-500 transition-all"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </td>

                    {/* Outstanding */}
                    <td className="py-5 text-right font-semibold text-primary-600">
                      Rs. {area.outstanding.toLocaleString()}
                    </td>

                    {/* Customers */}
                    <td className="py-5 text-right text-slate-700">
                      {area.customersOwing}
                    </td>

                    {/* Percentage */}
                    <td className="py-5 text-right text-slate-700">
                      {percentage.toFixed(1)}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  No outstanding balances found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CustomersOutstandingByArea;
