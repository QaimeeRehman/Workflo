import SettingsPage from "@/app/_components/Settings/SettingsPage";
import {
  getBusinessSettings,
  getInvoiceSettings,
  getProductTypes,
} from "@/app/_lib/dataService";

async function page() {
  const businessSettings = await getBusinessSettings();
  const invoiceSettings = await getInvoiceSettings();
  const productTypes = await getProductTypes();
  //   console.log(invoiceSettings);
  return (
    <SettingsPage
      businessSettings={businessSettings}
      invoiceSettings={invoiceSettings}
      productTypes={productTypes}
    />
  );
}

export default page;
