import Link from "next/link";
import CustomerInformation from "./CustomerInformation";
import CustomerAccountSummary from "./CustomerAccountSummary";
import CustomerRecentActivity from "./CustomerRecentActivity";
import { toCapitalize } from "@/app/_lib/helper";

function CustomerAccountOverview({ customer, ledger, ledgerSummary }) {
  console.log(ledger);
  return (
    <div className="space-y-6 max-w-[80vw]">
      {/* Customer Information */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {toCapitalize(customer.fullName)}
          </h1>
          <p className="mt-1 text-slate-500">Customer Details</p>
        </div>

        <Link
          href={`/customers/${customer.id}/edit`}
          className="rounded-lg bg-primary-500 px-5 py-3 font-medium text-white hover:bg-primary-900"
        >
          Edit Customer
        </Link>
      </div>
      {/* Keep your existing customer information component here */}
      <CustomerInformation customer={customer} />

      {/* Account Summary */}
      <CustomerAccountSummary ledgerSummary={ledgerSummary} />

      {/* Recent Ledger */}
      <CustomerRecentActivity ledger={ledger} customer={customer} />
    </div>
  );
}

export default CustomerAccountOverview;
