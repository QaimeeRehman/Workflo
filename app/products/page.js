import Link from "next/link";
import { Package } from "lucide-react";
import { supabase } from "../_lib/supabase";
import ProductSummary from "../_components/Product/ProductSummary";
import ProductTable from "../_components/Product/ProductTable";
import { getAllProducts } from "../_lib/dataService";

async function page() {
  const products = await getAllProducts();
  const totalProducts = products.length;
  const typeCake = products.filter((product) => product.type === "cake");
  const totalCakeProducts = typeCake.length;
  const typeBiscuit = products.filter((product) => product.type === "biscuit");
  const totalBiscuitProducts = typeBiscuit.length;

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
          href="/products/new"
          className="rounded-lg bg-primary-500 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-primary-900"
        >
          + Add Product
        </Link>
      </div>

      {/* Summary */}
      <ProductSummary
        totalProducts={totalProducts}
        totalBiscuitProducts={totalBiscuitProducts}
        totalCakeProducts={totalCakeProducts}
      />
      {/* Search / Filters */}
      {/* <div className="rounded-xl bg-white p-5 shadow">
        <div className="flex gap-4">
          Search
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search product..."
              className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>

          Product Type
          <select className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary-500">
            <option value="">All Types</option>
            <option value="biscuit">Biscuits</option>
            <option value="cake">Cakes</option>
          </select>

          Status
          <select className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div> */}

      {/* Table */}
      <ProductTable products={products} />
    </div>
  );
}

export default page;
