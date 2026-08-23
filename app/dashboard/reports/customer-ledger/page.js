import CustomerLedgerReport from "@/app/_components/Reports/Customer-ledger/CustomerLedgerReport";
import {
  getAllCustomers,
  getCustomerById,
  getCustomerLedger,
} from "@/app/_lib/dataService";

async function Page({ searchParams }) {
  const params = await searchParams;

  const customerId = params?.customer || null;
  const period = params?.period || "all";

  const customers = await getAllCustomers();

  let customer = null;
  let ledger = [];
  let summary = null;
  console.log(customers);
  if (customerId) {
    const [customerData, ledgerData] = await Promise.all([
      getCustomerById(customerId),
      getCustomerLedger(customerId, period),
    ]);

    customer = customerData;
    ledger = ledgerData.ledger;
    summary = ledgerData.summary;
  }

  return (
    <CustomerLedgerReport
      customers={customers}
      customer={customer}
      ledger={ledger}
      summary={summary}
      period={period}
    />
  );
}

export default Page;
