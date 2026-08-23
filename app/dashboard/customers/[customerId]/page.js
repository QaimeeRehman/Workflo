import CustomerAccountOverview from "@/app/_components/Customers/CustomerAccountOverview";
import {
  getCustomerAccountSummary,
  getCustomerById,
} from "@/app/_lib/dataService";

async function Page({ params }) {
  const { customerId } = await params;

  const [customer, summary] = await Promise.all([
    getCustomerById(customerId),
    getCustomerAccountSummary(customerId),
  ]);
  console.log(summary);

  return (
    <div className="space-y-6">
      <CustomerAccountOverview customer={customer} summary={summary} />
    </div>
  );
}

export default Page;
