import Info from "@/app/_components/Info";
import { toCapitalize } from "@/app/_lib/helper";
import { supabase } from "@/app/_lib/supabase";
import Link from "next/link";
import { format } from "date-fns";
async function page({ params }) {
  const { customerId } = await params;

  const { data: customer, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", customerId);

  const { id, created_at, fullName, saleType, taxCategory, cnic, phone, area } =
    customer[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {toCapitalize(fullName)}
          </h1>
          <p className="mt-1 text-slate-500">Customer Details</p>
        </div>

        <Link
          href={`/customers/${customerId}/edit`}
          className="rounded-lg bg-primary-500 px-5 py-3 font-medium text-white hover:bg-primary-900"
        >
          Edit Customer
        </Link>
      </div>

      {/* Customer Information */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-semibold">Customer Information</h2>

        <div className="grid grid-cols-8 gap-12">
          <span>
            <Info label="Customer ID" value={id} />
          </span>
          <Info label="Phone" value={phone} />
          <Info label="CNIC" value={cnic} />
          <Info label="Sale Type" value={toCapitalize(saleType)} />
          <Info label="Tax Category" value={toCapitalize(taxCategory)} />
          <Info label="Area" value={toCapitalize(area)} />
          <Info
            label="Created At"
            value={format(new Date(created_at), "dd MMM yyyy")}
          />
        </div>
      </div>

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
