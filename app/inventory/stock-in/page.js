import StockInForm from "@/app/_components/Inventory/stock-in/StockInForm";
import StockInHeader from "@/app/_components/Inventory/stock-in/StockInHeader";
import { getAllPackagings, getAllProducts } from "@/app/_lib/dataService";

async function page() {
  const products = await getAllProducts();
  const packaging = await getAllPackagings();
  return (
    <div className="mx-auto min-w-[80vw]  space-y-6">
      {/* Header */}
      <StockInHeader />
      {/* Form */}
      <StockInForm products={products} packaging={packaging} />
    </div>
  );
}

export default page;
