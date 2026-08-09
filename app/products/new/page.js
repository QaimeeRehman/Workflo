import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";
import NewProductForm from "@/app/_components/Product/NewProductForm";

function page() {
  return (
    <div className="mx-auto min-w-[80vw] p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link
              href="/products"
              className="flex items-center gap-1 hover:text-slate-800"
            >
              <ArrowLeft size={16} />
              Products
            </Link>

            <span>/</span>
            <span>New Product</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <Package size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Add New Product
              </h1>

              <p className="mt-1 text-slate-500">
                Add a new product to your inventory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <NewProductForm />
    </div>
  );
}

export default page;
