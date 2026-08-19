import StockInForm from "@/app/_components/Inventory/stock-in/StockInForm";
import StockInHeader from "@/app/_components/Inventory/stock-in/StockInHeader";
import {
  getAllPackagings,
  getAllProducts,
  getProductTypes,
} from "@/app/_lib/dataService";

async function page() {
  const products = await getAllProducts();
  const packaging = await getAllPackagings();
  const productTypes = await getProductTypes();
  return (
    <div className="mx-auto min-w-[80vw]  space-y-6">
      {/* Header */}
      <StockInHeader />
      {/* Form */}
      <StockInForm
        products={products}
        packaging={packaging}
        productTypes={productTypes}
      />
    </div>
  );
}

export default page;
