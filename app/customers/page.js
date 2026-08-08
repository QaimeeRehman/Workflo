import CustomersFilters from "../_components/Customers/CustomersFilters";
import CustomerTable from "../_components/Customers/CustomerTable";
import Link from "next/link";
import { supabase } from "../_lib/supabase";
async function page({ searchParams }) {
  const params = await searchParams;
  const search = params.search ?? "";
  const area = params.area ?? "";
  const saleType = params.saleType ?? "";
  const taxCategory = params.taxCategory ?? "";

  let query = supabase.from("customers").select("*");

  if (search) {
    query = query.or(`fullName.ilike.%${search}%,phone.ilike.%${search}%`);
  }

  if (area) {
    query = query.eq("area", area);
  }

  if (saleType) {
    query = query.eq("saleType", saleType);
  }

  if (taxCategory) {
    query = query.eq("taxCategory", taxCategory);
  }

  const { data: customers } = await query;

  return (
    <div className=" space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Customers</h1>
          <p className="mt-1 text-slate-500">Manage your customers.</p>
        </div>

        <Link
          href="/customers/new"
          className="rounded-lg bg-primary-500 px-5 py-3 font-medium text-white transition hover:bg-primary-900"
        >
          + Add Customer
        </Link>
      </div>

      {/* Filters */}
      <CustomersFilters />
      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        {customers.length > 0 ? (
          <CustomerTable customers={customers} />
        ) : (
          <p className="text-center">No Customer found</p>
        )}
      </div>
    </div>
  );
}

export default page;
