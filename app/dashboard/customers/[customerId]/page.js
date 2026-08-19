import CustomerAccountOverview from "@/app/_components/Customers/CustomerAccountOverview";
import { getCustomerById, getCustomerLedger } from "@/app/_lib/dataService";
async function page({ params, searchParams }) {
  const { customerId } = await params;
  const periodParams = await searchParams;
  const period = periodParams?.period || "month";
  const customer = await getCustomerById(customerId);
  const { ledger, summary: ledgerSummary } = await getCustomerLedger(
    customerId,
    period,
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <CustomerAccountOverview
        customer={customer}
        ledger={ledger}
        ledgerSummary={ledgerSummary}
      />
      {/* Purchase History */}
      {/* <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Purchase History</h2>
        </div>

        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Invoice</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Items</th>
              <th className="px-6 py-4 text-left">Total</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t hover:bg-slate-50">
              <td className="px-6 py-4">INV-0001</td>
              <td className="px-6 py-4">07 Aug 2026</td>
              <td className="px-6 py-4">12</td>
              <td className="px-6 py-4 font-medium">Rs. 15,240</td>

              <td className="px-6 py-4 text-center">
                <button className="rounded-md bg-slate-100 px-4 py-2 hover:bg-slate-200">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default page;
