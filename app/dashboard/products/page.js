import { Package } from "lucide-react";
import Link from "next/link";
import ProductSummary from "@/app/_components/Product/ProductSummary";
import ProductTable from "@/app/_components/Product/ProductTable";
import { getAllProducts } from "@/app/_lib/dataService";

async function page() {
  const products = await getAllProducts();
  const totalProducts = products.length;
  const typeCake = products.filter((product) => product.type === "cake");
  // const totalCakeProducts = typeCake.length;
  const typeBiscuit = products.filter((product) => product.type === "biscuit");
  // const totalBiscuitProducts = typeBiscuit.length;

  return (
    <div className="space-y-6 min-w-[80vw]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <Package size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">Products</h1>

              <p className="mt-1 text-slate-500">
                Manage your products and pricing.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/products/new"
          className="rounded-lg bg-primary-500 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-primary-900"
        >
          + Add Product
        </Link>
      </div>

      {/* Summary */}
      <ProductSummary totalProducts={totalProducts} />

      {/* Table */}
      <ProductTable products={products} />
    </div>
  );
}

export default page;
