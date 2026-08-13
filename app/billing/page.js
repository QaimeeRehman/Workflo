import BillingPage from "../_components/Billing/BillingPage";
import {
  getAllCustomers,
  getAllInventory,
  getAllPackagings,
  getAllProducts,
  getAllProductsForBilling,
} from "../_lib/dataService";

async function page() {
  const customers = await getAllCustomers();
  const products = await getAllProductsForBilling();
  const packagings = await getAllPackagings();
  const inventory = await getAllInventory();
  return (
    <BillingPage
      customers={customers}
      products={products}
      packagings={packagings}
      inventory={inventory}
    />
  );
}

export default page;
