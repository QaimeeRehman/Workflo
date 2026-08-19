import BillingPage from "@/app/_components/Billing/BillingPage";
import {
  getAllInventory,
  getAllPackagings,
  getAllProductsForBilling,
  getCustomerOutstandingSummary,
  getCustomersWithOutstanding,
} from "@/app/_lib/dataService";

async function page() {
  const customers = await getCustomersWithOutstanding();
  const products = await getAllProductsForBilling();
  const packagings = await getAllPackagings();
  const inventory = await getAllInventory();
  const { customerBalances } = await getCustomerOutstandingSummary(customers);
  return (
    <BillingPage
      customers={customers}
      products={products}
      packagings={packagings}
      inventory={inventory}
      customerBalances={customerBalances}
    />
  );
}

export default page;
