import CustomersFilters from "@/app/_components/Customers/CustomersFilters";
import CustomersLedgerSummary from "@/app/_components/Customers/CustomersLedgerSummary";
import CustomersOutstandingByArea from "@/app/_components/Customers/CustomersOutstandingByArea";
import CustomerTable from "@/app/_components/Customers/CustomerTable";
import {
  getCustomerOutstandingSummary,
  getCustomersbills,
  getCustomersWithOutstanding,
} from "@/app/_lib/dataService";
import Link from "next/link";
async function page({ searchParams }) {
  const params = await searchParams;
  const search = params.search ?? "";
  const area = params.area ?? "";
  const saleType = params.saleType ?? "";
  const taxCategory = params.taxCategory ?? "";
  const outstanding = params.outstanding ?? "";

  const customers = await getCustomersWithOutstanding();
  const customersBills = await getCustomersbills();
  const totalCustomerSales = customersBills.reduce(
    (acc, bill) => bill.total + acc,
    0,
  );
  let filteredCustomers = customers;

  if (search) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.fullName.toLowerCase().startsWith(search.toLowerCase()),
    );
  }
  if (area) {
    filteredCustomers = filteredCustomers.filter(
      (customer) => customer.area === area,
    );
  }
  if (saleType) {
    filteredCustomers = filteredCustomers.filter(
      (customer) => customer.saleType === saleType,
    );
  }
  if (taxCategory) {
    filteredCustomers = filteredCustomers.filter(
      (customer) => customer.taxCategory === taxCategory,
    );
  }
  if (outstanding) {
    filteredCustomers = filteredCustomers.filter(
      (customer) => customer.outstanding > 0,
    );
  }

  const {
    summary: customersLedgerSummary,
    outstandingByArea,
    customerBalances,
  } = await getCustomerOutstandingSummary(filteredCustomers);

  return (
    <div className=" space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Customers</h2>
          <p className="mt-1 text-slate-500">Manage your customers.</p>
        </div>

        <div className="space-x-3">
          <Link
            href="/dashboard/customers/payments/new"
            className="rounded-lg bg-primary-900 px-5 py-3 font-medium text-white transition hover:bg-primary-500"
          >
            Receive Payment
          </Link>
          <Link
            href="/dashboard/customers/new"
            className="rounded-lg bg-primary-500 px-5 py-3 font-medium text-white transition hover:bg-primary-900"
          >
            + Add Customer
          </Link>
        </div>
      </div>

      <CustomersLedgerSummary
        customersLedgerSummary={customersLedgerSummary}
        totalSales={totalCustomerSales}
      />

      <CustomersOutstandingByArea
        data={outstandingByArea}
        totalOutstanding={customersLedgerSummary.totalOutstanding}
      />

      {/* Filters */}
      <CustomersFilters outstanding={outstanding} />

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        {filteredCustomers?.length > 0 ? (
          <CustomerTable
            customers={filteredCustomers}
            customerBalances={customerBalances}
          />
        ) : (
          <p className="text-center">No Customer found</p>
        )}
      </div>
    </div>
  );
}

export default page;
