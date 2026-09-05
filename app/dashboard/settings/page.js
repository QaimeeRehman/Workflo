import SettingsPage from "@/app/_components/Settings/SettingsPage";
import {
  getAllUsers,
  getBusinessSettings,
  getInvoiceSettings,
  getProductTypes,
} from "@/app/_lib/dataService";

async function page() {
  const businessSettings = await getBusinessSettings();
  const invoiceSettings = await getInvoiceSettings();
  const productTypes = await getProductTypes();
  const users = await getAllUsers();
  //   console.log(invoiceSettings);
  return (
    <SettingsPage
      businessSettings={businessSettings}
      invoiceSettings={invoiceSettings}
      productTypes={productTypes}
      users={users}
    />
  );
}

export default page;
